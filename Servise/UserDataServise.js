let Core = require("../util/dataCore").Core;

DataServise.$inject = ['app.userRepository'];
Core.module('app').service('app.userDataServise', UserDataServise);

function UserDataServise (userRepository) {
    let self = this;

    self.login = (data, cbSuccess, cbError) => {			
        userRepository.login(
            data,
            (result) => { cbSuccess(result); },
            (err) => { cbError(err); }
        );
    }

    self.findAll = (cbSuccess, cbError) => {
        userRepository.allUsers(
            (result) => { cbSuccess(result); },
            (err) => { cbError(err); }
        );
    }

    self.findOne = (id, cbSuccess, cbError) => {		
        userRepository.oneUser(
            id,
            (result) => { cbSuccess(result); },
            (err) => { cbError(err); }
        );
    }

    self.add = (data, cbSuccess, cbError) => {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);
            if (!checkRegExPassword(data.password)) return cbError({ error: "Incorrect password" }, 400);

            userRepository.add(
                data,
                (result) => { cbSuccess(result); },
                (err, status) => { cbError(err, status); }
            );
        }
    }

    self.update = (id, data, cbSuccess, cbError) => {
        let emptyField = checkEmptyField(data);	

        if (emptyField.length !== 0) {
            cbError({ error: "Fields empty."}, 400);
        } else {
            if (!checkRegExEmail(data.email)) return cbError({ error: "Incorrect email" }, 400);
            if (!checkRegExLogin(data.username)) return cbError({ error: "Incorrect login" }, 400);

            userRepository.updateUser(
                id,
                data,
                (result) => { cbSuccess(result); },
                (err) => { cbError(err); }
            );
        }
    }

    self.delete = (id, cbSuccess, cbError) => {
        userRepository.deleteUser(
            id,
            () => { cbSuccess(); },
            (err) => { cbError(err); }
        );
    }

    function checkEmptyField(userData) {
        let result = [];

        for (let index in userData) {
            let field = userData[index];			
            field = field.replace(/\s*/g, '');
        
            if (field === "") result.push(index);
        }

        return result;
    }

    function checkRegExLogin(login) { return /^[a-zA-Z1-9].{4,16}$/.test(login); }
    function checkRegExPassword(pass) { return /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{8,}$/.test(pass) && pass.length > 7; }
    function checkRegExEmail(email) { return /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/.test(email); }	
}