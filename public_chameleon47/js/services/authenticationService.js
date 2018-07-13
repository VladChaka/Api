define(function () {
    var moduleAuthenticationService = angular.module("moduleAuthenticationService", ['moduleRemoteService']);

    moduleAuthenticationService.service('authentication', Authentication);

    Authentication.$inject = ['userRemoteService'];

    function Authentication(userRemoteService) {
        this.authentication = function(login, pass, callback) {
            var authenticationInfo = {
                username: login,
                password: pass
            };

            userRemoteService.auth.save(authenticationInfo, function(response) {
                    callback(response);
                },
                function(err) {
                    callback(err.data);
                });
        }
    }
});