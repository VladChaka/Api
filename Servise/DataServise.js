let Core = require("../util/dataCore").Core;

DataServise.$inject = ['app.userRepository'];
Core.module('app').service('app.dataServise', DataServise);

function DataServise (userRepository) {
    let self = this;

    self.login = function(data, cbSuccess, cbError) {			
        userRepository.login(data, function (result) {
            cbSuccess(result);
        },
        function (err) {
            cbError(err);
        });
    }

    self.findAll = function(cbSuccess, cbError) {
        userRepository.allUsers(function (result) {
            cbSuccess(result);
        },
        function (err) {
            cbError(err);
        });
    }

    self.findOne = function(id, cbSuccess, cbError) {		
        userRepository.oneUser(id, function (result) {
            cbSuccess(result);
        },
        function (err) {
            cbError(err);
        });
    }

    self.add = function(data, cbSuccess, cbError) {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
            if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);

            userRepository.add(data, function (result) {
                cbSuccess(result);
            },
            function (err, status) {
                cbError(err, status);
            });
        }
    }





    self.books = function(addBook, cbSuccess, cbError) {   
        let emptyField = checkEmptyField(Zone.current.data.book);	
        
        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            userRepository.workingWithBooks(
                addBook,
                (result) => { cbSuccess(result); },
                (err, status) => { cbError(err, status); }
            );
        }     
        
    }





    self.update = function(id, data, cbSuccess, cbError) {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
			
            userRepository.updateUser(id, data, function (result) {
                cbSuccess(result);
            },
            function (err) {
                cbError(err);
            });
        }
    }

    self.delete = function(id, cbSuccess, cbError) {
        userRepository.deleteUser(id, function () {
            cbSuccess();
        },
        function (err) {
            cbError(err);
        });
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