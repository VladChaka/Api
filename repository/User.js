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
        },
        book: {
            name: {
                type: String
            },
            date: {
                type: String
            }
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
                    const token = jwt.sign({ username: data.username }, 'yqawv8nqi5', { expiresIn: '1h' });
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




    self.workingWithBooks = (addBook, cbSuccess, cbError) => {

        console.log("test1",Zone.current.data);
        self.SchemaModel.findOne({ _id: Zone.current.data.user.id }, (err, user) => {
            console.log("test2",Zone.current.data); //undefined
        });

        self.oneUser(Zone.current.data.user.id,
            (result) => {                
                if (checkUserBooks(addBook, result, Zone.current.data, cbError)) return;

                let book = (addBook) ? { book : Zone.current.data.book } : { book : { name: '', date: '' } };

                self.SchemaModel.findOneAndUpdate({ _id: Zone.current.data.user.id }, book)
                .then((user) => {
                    Zone.current.data.user = rebuildUserData(user, null, null, true);
                    cbSuccess(Zone.current.data.user);
                })
                .catch((err) => {
                    cbError({ error: err.message }, 500);
                });

            },
            (err, status) => {
                cbError(err, status);
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

    function checkUserBooks(addBook, data, zone1, cbError) {
        let error = false;
        if (addBook && data.book.name !== "") {
            error = true;
            cbError({ error: 'User have a book.'}, 400);
        }
        if (!addBook && data.book.name !== zone1.book.name) {
            error = true;
            cbError({ error: 'User don\'t have this book.'}, 400);
        }
        return error;
    }

    function checkRegExPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
}
