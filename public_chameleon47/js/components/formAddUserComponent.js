define(function () {
    angular.module('usersApp').component('formAddUser', {
        templateUrl: 'includes/FormAddUser.html',
        controllerAs: 'uc',
        bindings: {
            emailConflict: '=',
            loginConflict: '=',
            closeFormAddUser: '<',
            addUser: '<',
            formAddUser: '='
        }
    });
});