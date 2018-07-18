define(['common', 'mainService'], function() {
        var mainRemoteService = angular.module("usersApp.commonModule");

        mainRemoteService.service('usersApp.service.remote', RemoteService);
        mainRemoteService.factory('tokenInterceptor', tokenInterceptor);

        RemoteService.$inject = ['$resource', 'usersApp.service.token'];
        tokenInterceptor.$inject = ['usersApp.service.token'];

        function tokenInterceptor(TokenService) {
            return {
                'request': function(config) {
                    config.params = { token: TokenService.getToken() };
                    return config;
                    },
                'response': function(response) {
                    return response;
                }
            };
        }
        function RemoteService($resource, tokenService) {
            var self = this;

            self.auth = $resource('/login');
			self.getAll = $resource('/users', null,
                {get: {
                        method: 'GET',
                        interceptor: tokenInterceptor(tokenService)
                    }
                });
			self.create = $resource('/users', null,
                {save: {
                        method: 'POST',
                        interceptor: tokenInterceptor(tokenService)
                    }
                });
			self.delete = $resource('/users/:userId', { userId: '@id' },
                {delete: {
                        method: 'DELETE',
                        interceptor: tokenInterceptor(tokenService)
                    }
                });
			self.getById = $resource('/users/:userId', { userId: '@id' },
                {get: {
                    method: 'GET',
                    interceptor: tokenInterceptor(tokenService)
                }
                });
			self.update = $resource('/users/:id', { id: '@id' },
                {update: {
                    method: 'PUT',
                    interceptor: tokenInterceptor(tokenService)
                }
            });
        }
});
