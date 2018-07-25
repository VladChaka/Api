let mongoose = require("mongoose"),
    Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    Schema = mongoose.Schema;
    
Core.module('app').service('app.userRepository', userRepository);

function userRepository(){
    let self = this;

    self.UserSchema = new Schema({
        username: {
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
        fullname: {
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
        }
    });	

    self.SchemaModel = mongoose.model("User", self.UserSchema);

    self.login = function (data, cbSuccess, cbError) {
        self.SchemaModel.findOne({ username: data.username }, function(err, user) {
            if (err || !user) {
                cbError({ error: 'Authentication failed. Login or password wrong.' });
            } else {
                self.UserSchema.methods.verifyPassword(data.password, (err, success) => {
                    if (err || !success) {
                        cbError({ error: 'Authentication failed. Login or password wrong.' });
                        return;
                    }
                    const token = jwt.sign({ username: data.username }, 'yqawv8nqi5', { expiresIn: '1 h' });
                    cbSuccess({ id: user._id, token: token });
                }, user.password);
            }
        });
    }

    self.allUsers = function (cbSuccess, cbError) {
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

    self.oneUser = function (id, cbSuccess, cbError) {
        self.SchemaModel.findOne({ _id: id }, function(err, user) {
            if (err || !user) {                
                cbError({ error: "Invalid id." }, 400);
                return;
            }			
            data = rebuildUserData(user, null, [
                'password',
                'rating',
                'regDate'
            ], true);
            cbSuccess(data);
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
            regDate: data.regDate
        });
        self.hashPassword(new_user, function (new_user) {
            new_user.save(function(err, user) {
                if (err) {
                    cbError({ error: err.message }, 500);
                    return;
                }
                data = rebuildUserData(user, true);					
                cbSuccess(data);
            });
        }, function (err) {
            cbError({ error: err.message }, 500);
        });
    }

    self.updateUser = function (id, data, cbSuccess, cbError) {
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
                        let error = { error: err.message};
                        cbError(error, 500);
                        return;
                    }
                    data = rebuildUserData(user, true);			
                    cbSuccess(data);
                });
            }, function (err) {
                cbError({ error: err.message }, 500);
            });
    }

    self.deleteUser = function (id, cbSuccess, cbError) {
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
                'regDate'
            ];
        if (oneUser === true) {
            user = buildUserData(userData, standartUserFields, addField, delField);
        } else {
            user = [];
            for (let i = 0; i < userData.length; i++) {
                user.push(buildUserData(userData[i], standartUserFields, addField, delField));
            }
        }
        return user;
    }

    function buildUserData(userData, standartUserFields, addField, delField) {
        let user = {};
        for (const index in userData) {
            for (let i = 0; i < standartUserFields.length; i++) {
                if (standartUserFields[i] === index) {
                    user[index]	= userData[index];
                }
                if (addField !== null && addField[i] === index) {
                    user[index] = userData[index];
                }
            }
        }
        for (let i = 0; i < delField.length; i++) {
            delete user[delField[i]];
        }		
        return user
    }

    self.hashPassword = function (data, cbSuccess) {
        const user = data;
        if (data.password !== undefined && data.password.length !== 0) {
            if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);
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

    function checkRegExPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
