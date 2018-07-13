define(function () {
    var moduleTokenService = angular.module("moduleTokenService", []);

    moduleTokenService.service('tokenService', TokenService);

    function TokenService() {
        var token = null,
            self = this;

        self.setToken = function (newToken) {
            token = newToken;
        };
        self.getToken = function () {
            return token;
        }
    }
});