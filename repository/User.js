let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    
Core.module('app').service('app.userRepository', UserRepository);

function UserRepository(){
    let self = this;

    self.UserSchema = new Schema({
        userName: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        regDate: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    });	

    self.SchemaModel = mongoose.model("User", self.UserSchema);

    self.login = (data, cbSuccess, cbError) => {
        self.SchemaModel.findOne({ username: data.username })
        .then((user) => {
            let error = { error: 'Authentication failed. Login or password wrong.' };
            if (!user) {
                cbError(error);
                return;
            }

            self.UserSchema.methods.verifyPassword(
                data.password,
                (err, success) => {
                    if (err || !success) {
                        cbError(error);
                        return;
                    }

                    const token = jwt.sign({ username: data.username }, 'yqawv8nqi5', { expiresIn: '1h' });
                    cbSuccess({ id: user._id, token: token });
                },
                user.password
            );
        })
        .catch((err) => {
            cbError({ error: 'Authentication failed. Login or password wrong.' });
        });
    }

    self.getAll = (cbSuccess, cbError) => {
        self.SchemaModel.find({}, function(err, users) {
            if (err) {
                cbError({ error: err.message });
                return;
            }
            let data = rebuildUserData(users, null, [
                'password',
                'phone',
                'email'
            ], false);			
            cbSuccess(data);
        });
    }

    self.getOne = function (id, cbSuccess, cbError) {
        self.SchemaModel.findOne({ _id: id })
        .then((user) => {
            data = rebuildUserData(user, null, [
                'password',
                'rating',
                'regDate'
            ], true);
            cbSuccess(data);
        })
        .catch((err) => {
            cbError({ error: "Invalid id." }, 400);
        });
    }

    self.add = function (data, cbSuccess, cbError) {
        const new_user = new self.SchemaModel({
            username: data.username,
            email: data.email,
            post: data.post,
            phone: data.phone,
            password: data.password,
            fullname: data.fullname,
            rating: 0,
            regDate: data.regDate,
            book: {
                name: '',
                date: ''
            }
        });
        self.hashPassword(new_user, function (new_user) {
            new_user.save(function(err, user) {
                if (err) {
                    cbError({ error: err.message }, 500);
                    return;
                }
                data = rebuildUserData(user, null, null, true);					
                cbSuccess(data);
            });
        }, function (err) {
            cbError({ error: err.message }, 500);
        });
    }

    self.update = function (id, data, cbSuccess, cbError) {
        self.hashPassword(data, function (data) {
            let dataJson = {
                    email: data.email,
                    post: data.post,
                    phone: data.phone,
                    fullname: data.fullname,
                };

                self.SchemaModel.findOneAndUpdate({ _id: id }, dataJson,
                function(err, user) {
                    if (err) {
                        let error = { error: err.message };
                        cbError(error, 500);
                        return;
                    }

                    data = rebuildUserData(user, null, null, true);			
                    cbSuccess(data);
                });
            }, function (err) {
                cbError({ error: err.message }, 500);
            });
    }

    self.delete = function (id, cbSuccess, cbError) {
        self.SchemaModel.findOneAndRemove({ _id: id }, function(err, user) {
            if (err || !user) {
                cbError({ error: "Invalid id." }, 400);
                return;
            }
            cbSuccess();
        });
    }    

    self.UserSchema.methods.verifyPassword = function(password, cb, _thisPassword) {
        bcrypt.compare(password, _thisPassword, function(err, isMatch) {			
            if (err) {
                cb(err);
                return;
            }
            cb(null, isMatch);
        });
    };

    self.createHashPassword = function (data, cbSuccess) {
        const user = data;
        if (data.password !== undefined && data.password.length !== 0) {
            if (!checkRegExpPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);
            bcrypt.genSalt(5, function(err, salt) {
                if (err) {
                    return;
                }

                bcrypt.hash(user.password, salt, null, function(err, hash) {
                    if (err) {
                        return;
                    }
                    user.password = hash;
                    cbSuccess(user);
                });
            });
        } else {
            cbSuccess(user);
        }
    };
	
    function rebuildUserData(userData, addField, delField, oneUser) {
        let user,
            standartUserFields = [
                '_id',
                'username',
                'email',
                'fullname',
                'phone',
                'post',
                'rating',
                'regDate,',
                'book'
            ];

        if (oneUser === true) {
            user = buildUserData(userData, standartUserFields, addField, delField);
        } else {
            user = [];
            userData.map((element) => {
                user.push(buildUserData(element, standartUserFields, addField, delField));
            });
        }
        return user;
    }

    function buildUserData(userData, standartUserFields, addField, delField) {
        let user = {};        
        for (const index in userData) {
            standartUserFields.map((element) => {
                if (element === index) {
                    user[index]	= userData[index];
                }
                if (addField !== undefined && addField !== null && addField[i] === index) {
                    user[index] = userData[index];
                }
            });
            
        }

        if (delField !== undefined && delField !== null && delField.length !== null) {
            delField.map((element) => {
                delete user[element];
            });
        }
              
        return user
    }

    function checkRegExpPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
