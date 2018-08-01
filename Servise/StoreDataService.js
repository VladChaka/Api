let Core = require("../util/dataCore").Core;

Core.module('app').service('app.storeDataService', StoreDataService);

function StoreDataService (userRepository) {
    let self = this;

    self.setData = () => {
        
    }

    self.getData = () => {
        
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