define(['remoteService'], function(){
    UsersService.$inject = ['usersApp.service.remote', 'usersApp.service.token'];

    function UsersService(remoteService, tokenService) {
       var self = this;

       self.deleteUser = function(id) {
           var user = {
			   userId: id,
               token: tokenService.getToken()
           };

           return remoteService.delete.delete(user).$promise;
       };

       self.addUser = function(user, callback) {
           user.token = tokenService.getToken();

           remoteService.create.save(user,
               function(response) {
                   callback(response);
               },
               function(error) {
                   callback(error);
               });
       };

       self.editUser = function(user, callback) {
           user.token = tokenService.getToken();
           remoteService.update.update(user, function(response) {
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

           remoteService.getById.get(user, function(user) {
               callback(user);
           });
       };

       self.getAllUsers = function() {
           return remoteService.getAll.query().$promise;
       }
    }

    return function (module) {
        module.service('usersApp.service.users', UsersService)
    }
});