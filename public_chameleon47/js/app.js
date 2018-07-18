define(['usersController'], function(){
    angular.module('app', ['usersApp'])
        .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('tokenInterceptor');
    }]);
});