define(function () {
    angular.module('usersApp').component('profileControlPanel', {
        template: '<button ng-click="uc.openUserProfile()">\n' +
        '    Go to profile\n' +
        '</button>\n' +
        '<button ng-click="uc.deleteUser()" \n' +
        '        type="batton">\n' +
        '    Delete user\n' +
        '    <span>✖</span>\n' +
        '</button>',
        controllerAs: 'uc',
        bindings: {
            openUserProfile: '&',
            deleteUser: '&'
        }
    });
});