define(['common'], function() {
        var mainRemoteService = angular.module("usersApp.commonModule");

        mainRemoteService.service('usersApp.service.remote', RemoteService);

        RemoteService.$inject = ['$resource'];

        function RemoteService($resource) {
            var self = this;

			// self.auth = $resource('/login');
			self.auth = $resource('/login', null, {
				save: {
					method: 'POST',
					interceptor: {
						request: function(config) {
							// Before the request is sent out, store a timestamp on the request config
							config.requestTimestamp = Date.now();
							console.log("config",config);
							
							return config;
						},
						response: function(response) {
							// Get the instance from the response object
							var instance = response;

							// Augment the instance with a custom `saveLatency` property, computed as the time
							// between sending the request and receiving the response.
							instance.saveLatency = Date.now() - response.config.requestTimestamp;

							console.log("response",response);
							// Return the instance
							return instance;
						}
					} 
				} 
			});
			self.getAll = $resource('/users');
			self.create = $resource('/users');
			self.delete = $resource('/users/:userId', { userId: '@id' });
			self.getById = $resource('/users/:userId', { userId: '@id' });
			self.update = $resource('/users/:userId', { userId: '@id' }, { update: { method: 'PUT' }});
		}
});