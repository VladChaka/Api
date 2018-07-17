define(['angular', 'mainComponent', 'mainService', 'mainFilter', 'mainDirective'], function(){
    var usersApp = angular.module("usersApp", [
        'usersApp.commonModule'
    ]);

    usersApp.controller('usersController', usersController);

    usersController.$inject = [
        'usersApp.service.token',
        'usersApp.service.users',
        'usersApp.service.authentication'
    ];

    function usersController(tokenService, usersService, authentication) {
        var uc = this;
        uc.btnText = 'Enter';
        uc.title = 'hi';
        uc.userAuthorized = false;
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
        }

        uc.login = function() {
            authentication.authentication(uc.authenticationLogin, uc.authenticationPass, function (response) {				
                if (response.error !== 'Authentication failed. Login or password wrong.') {
                        refreshUsers();
                        uc.token = response.token;
                        tokenService.setToken(uc.token);
                        uc.userAuthorized = true;
                }
            });
        };

        uc.logout = function() {
            uc.users = undefined;
            tokenService.setToken(null);
            uc.userAuthorized = false;
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
            })
        };

        uc.editUser = function() {
            var user = {
                id: uc.userProfile.id,
                email: uc.userProfile.email,
                post: uc.userProfile.post,
                phone: uc.userProfile.phone,
                fullname: uc.userProfile.fullname
            };

			if (uc.userProfile.password !== undefined && uc.userProfile.password.length !== 0) {
                user.password = uc.userProfile.password;
			}

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
    }
});