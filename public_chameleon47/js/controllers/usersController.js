define([], function(){
    var usersApp = angular.module("usersApp", ['moduleUsersService', 'moduleAuthenticationService', 'moduleReverseFilter', 'moduleStartFromFilter', 'validate']);

//usersApp.controller('usersController', ['authentication', 'usersService', 'tokenService', function(authentication, usersService, tokenService) {
    usersApp.controller('usersController', ['$scope', 'authentication', 'usersService', 'tokenService', function($scope, authentication, usersService, tokenService) {
        var uc = this;
        uc.btnText = 'Enter';
        uc.title = 'hi';
    uc.showUserProfile = false;
    uc.showFormAddUser = false;
    uc.currentPage = 1;
    uc.pageSize = 15;

    uc.closeFormAddUser = function(){
       uc.showFormAddUser = false;
       uc.emailConflict = false;
       uc.loginConflict = false;
       uc.formAddUser = {};
    };

    uc.addUser = function() {
       usersService.addUser(uc.formAddUser, function(response) {
               if (response.error === "This login duplicate") {
                   uc.emailConflict = false;
                   uc.loginConflict = true;
               } else if (response.error === "This email duplicate") {
                   uc.emailConflict = true;
                   uc.loginConflict = false;
               } else {
                   refreshUsers();
                   uc.closeFormAddUser();
                   uc.showFormAddUser = false;
               }
       });
    };

    function refreshUsers() {
       usersService.getAllUsers().then(function(users) {
           uc.users = users;
           uc.numberOfPages = Math.ceil(uc.users.length / uc.pageSize);
       })
    };

    uc.authorization = function() {
       authentication.authentication(uc.authenticationLogin, uc.authenticationPass, function (response) {
			if (response.error !== 'Authentication failed. Login or password wrong.') {
				uc.token = response.token;
				tokenService.setToken(uc.token);
			}
		});
    };

    uc.openUserProfile = function(userId) {
       usersService.getOneUser(userId, function(userInfo) {
           uc.userProfile = userInfo;
           uc.showUserProfile = true;
       });
    };

    uc.closeUserProfile = function(){
       uc.showUserProfile = false;
       uc.emailConflict = false;
    };

    uc.deleteUser = function(userId) {
       usersService.deleteUser(userId).then(function () {
           refreshUsers();
       });
    };

    uc.editUser = function() {
           var user = {
               id: uc.userProfile._id,
               email: uc.userProfile.email,
               post: uc.userProfile.post,
               phone: uc.userProfile.phone,
               password: uc.userProfile.password,
               fullname: uc.userProfile.fullname
           };

       usersService.editUser(user, function(response) {
          if (response.data !== undefined) {
              if (response.data.error === "This email duplicate") {
                  uc.emailConflict = true;
              }
          }
          else {
              refreshUsers();
              uc.closeUserProfile();
          }
       });
    };

    refreshUsers();
}]);
    })