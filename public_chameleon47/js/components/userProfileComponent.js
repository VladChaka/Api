define(function () {
    angular.module('usersApp').component('userProfile', {
        templateUrl: 'includes/UserProfile.html',
        controllerAs: 'uc',
        bindings: {
            emailConflict: '=',
            closeUserProfile: '<',
            userProfile: '=',
            editUser: '<',
        }
    });
});
