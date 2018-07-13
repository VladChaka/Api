define(function () {
    angular.module('usersApp').directive('mainPage', function () {
        return {
            templateUrl: 'includes/mainPage.html',
            restrict: 'E'
        }
    });
});