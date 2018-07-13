define(function() {
        var moduleRemoteService = angular.module("moduleRemoteService", ['ngResource']);

        moduleRemoteService.service('userRemoteService', UserRemoteService);

        UserRemoteService.$inject = ['$resource'];

        function UserRemoteService($resource) {
            var self = this;

            self.auth = $resource('/login');
			self.getAll = $resource('/users');
			self.create = $resource('/users');
			self.delete = $resource('/users/:userId', { userId: '@id' });
			self.getById = $resource('/users/:userId', { userId: '@id' });
			self.update = $resource('/users/:userId', { userId: '@id' }, { update: { method: 'PUT' }});
        }
});
