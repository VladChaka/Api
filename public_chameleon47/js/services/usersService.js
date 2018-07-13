define(function(){
    var moduleUsersService = angular.module("moduleUsersService", ['moduleRemoteService', 'moduleTokenService']);

    moduleUsersService.service('usersService', UsersService);

    UsersService.$inject = ['userRemoteService', 'tokenService'];

    function UsersService(userRemoteService, tokenService) {
       var self = this;

       self.deleteUser = function(id) {
           var user = {
			   userId: id,
               token: tokenService.getToken()
           };
		   
           userRemoteService.delete.delete(user).$promise;
       };

       self.addUser = function(user, callback) {
           user.token = tokenService.getToken();

           userRemoteService.create.save(user,
               function(response) {
                   callback(response);
               },
               function(error) {
                   callback(error);
               });
       };

       self.editUser = function(user, callback) {
		   user.token = tokenService.getToken();
		   
			userRemoteService.update.update(user, function(response) {
				callback(response);
			}, function(error) {
				callback(error);
			});
       };

       self.getOneUser = function(id, callback) {
           var user = {
			   userId: id,
               token: tokenService.getToken()
		   };
		   
		   userRemoteService.getById.get(user, function(user) {
				callback(user);
		   });
       };

       self.getAllUsers = function() {
           return userRemoteService.getAll.query().$promise;
       }
    }
    });