let Core = require("../util/dataCore").Core,
    bcrypt = require('bcrypt-nodejs');

DataServise.$inject = ['app.repository.User'];
Core.module('app').service('app.Servise.DataServise', DataServise);

function DataServise (User) {
    let self = this;

    self.login = function(data, cbSuccess, cbError) {			
        User.Schema.findOne({ username: data.username }, function(err, user) {
            if (err || !user) {
                cbError({ error: 'Authentication failed. Login or password wrong.' });
            } else {
                User.UserSchema.methods.verifyPassword(data.password, (err, success) => {
                    if (err || !success) {
                        cbError({ error: 'Authentication failed. Login or password wrong.' });
                        return;
                    }
                    cbSuccess(user._id);
                }, user.password);
            }
        });
    }

    self.findAll = function(cbSuccess, cbError) {
        User.Schema.find({}, function(err, users) {
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

    self.findOne = function(id, cbSuccess, cbError) {		
        User.Schema.findOne({ _id: id }, function(err, user) {
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

    self.add = function(data, cbSuccess, cbError) {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            let error = { error: "Fields empty."};
            cbError(error, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
            if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);
            const new_user = new User.Schema({
                username: data.username,
                email: data.email,
                post: data.post,
                phone: data.phone,
                password: data.password,
                fullname: data.fullname,
                rating: 0,
                regDate: data.regDate
            });
            hashPassword(new_user, function (new_user) {
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
    }

    self.update = function(id, data, cbSuccess, cbError) {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            let error = { error: "Fields empty."};
            cbError(error, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
			
            hashPassword(data, function (data) {
            let dataJson = {
                    email: data.email,
                    post: data.post,
                    phone: data.phone,
                    fullname: data.fullname,
                };

            User.Schema.findOneAndUpdate({ _id: id }, dataJson,
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
    }

    self.delete = function(id, cbSuccess, cbError) {
        User.Schema.findOneAndRemove({ _id: id }, function(err, user) {
            if (err || !user) {
                cbError({ error: "Invalid id." }, 400);
                return;
            }
            cbSuccess({ success: true });
        });
    }

    User.UserSchema.methods.verifyPassword = function(password, cb, _thisPassword) {
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

    function checkEmptyField(userData) {
        let result = [];
        for (let index in userData) {
            let field = userData[index];			
            field = field.replace(/\s*/g, '');
            if (field === "") {
                result.push(index);
            }
        }
        return result;
    }

    function hashPassword(data, cbSuccess) {
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

    function checkRegExLogin(login) {
        return /^[a-zA-Z1-9].{4,16}$/.test(login);
    }
    function checkRegExPassword(pass) {
        return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7;
    }
    function checkRegExEmail(email) {
        return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email);
    }	
}