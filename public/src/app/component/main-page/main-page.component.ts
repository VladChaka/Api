import { Component, OnInit } from '@angular/core';

import { Users } from '../../model/users';

import { UserService } from '../../service/user.service';
import { AuthenticationService } from '../../service/authentication.service';
import { FormService } from '../../service/form.service';
import { RemoteService } from '../../service/remote.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    users: Users[];
    countUsers: number;

    filterByDate: boolean = true;

    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 18;

    constructor(
        protected userService: UserService,
        protected formService: FormService,
        protected remoteService: RemoteService,
        protected authenticationService: AuthenticationService,
        protected tokenService: TokenService
    ) {
        if (localStorage['username'] !== undefined && localStorage['password'] !== undefined) {
            this.authenticationService.authentication({
                username: localStorage['username'],
                password: localStorage['password']
            });
            this.authenticationService.userAuthentication = true;
        };
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getAll("token")
        .subscribe(users => {
            this.users = users;

            this.convertData(this.users);

            this.countUsers = users.length;
            this.numberOfPages = Math.ceil(users.length / this.pageSize);
        });
    }

    convertData(users: Users[]): void {
        users.map((element: any) => {
            let date: number = element.regDate * 1,
                newDate = new Date(date),
                day = newDate.getDate(),
                month = newDate.getMonth() + 1,
                year = newDate.getFullYear();

            element.regDate = day + '.' + month + '.' + year;
        });
    }

    openAddForm(): void {
        this.formService.openAddForm();
    }

    logout(): void {
        this.users = undefined;
        this.authenticationService.logout();
    }

//
//   function refreshUsers() {
//     usersService.getAllUsers().then(function(users) {
//        users = users;
//
//        users.map((element) => {
//         let date = element.regDate * 1,
//           newDate = new Date(date),
//           day = newDate.getDate(),
//           month = newDate.getMonth() + 1,
//           year = newDate.getFullYear();
//
//         element.regDate = day + '.' + month + '.' + year;
//       })
//
//        numberOfPages = Math.ceil( users.length /  pageSize);
//     })
//   }
//
//    login = function() {
//     authentication.authentication( authenticationLogin,  authenticationPass, function (response) {
//       if (response.status === 400) {
//          this.authenticationService.loginError = true;
//         $timeout(function () {
//            this.authenticationService.loginError = false
//         }, 4000)
//       } else {
//         localStorage['login'] =  authenticationLogin;
//         localStorage['pass'] =  authenticationPass;
//         refreshUsers();
//         tokenService.setToken(response.token);
//          userAuthentication = true;
//       }
//     });
//   };
//
// (function autoLogin() {
//     if (localStorage['login'] !== undefined && localStorage['pass']!== undefined) {
//       authentication.authentication(localStorage['login'], localStorage['pass'], function (response) {
//         if (response.status !== 400) {
//           refreshUsers();
//           tokenService.setToken(response.token);
//            userAuthentication = true;
//         } else {
//            userAuthentication = false
//         }
//       });
//     } else { userAuthentication = false}
//   })();
//
//    logout = function() {
//     delete localStorage['login'];
//     delete localStorage['pass'];
//      users = undefined;
//     tokenService.setToken(null);
//      userAuthentication = false;
//   };
//
//    openUserProfile = function(userId) {
//     usersService.getOneUser(userId, function(userInfo) {
//        userProfile = userInfo;
//        showUserProfile = true;
//     });
//   };
//
//    closeUserProfile = function(){
//      showUserProfile = false;
//      emailConflict = false;
//   };
//
//    deleteUser = function(userId) {
//     usersService.deleteUser(userId).then(function () {
//       refreshUsers();
//     })
//   };
//
//    editUser = function() {
//     var user = {
//       id:  userProfile._id,
//       email:  userProfile.email,
//       post:  userProfile.post,
//       phone:  userProfile.phone,
//       fullname:  userProfile.fullname
//     };
//
//     if ( userProfile.password !== undefined &&  userProfile.password.length !== 0) {
//       user.password =  userProfile.password;
//     }
//
//     usersService.editUser(user, function(response) {
//       if (response.status === 500) {
//          emailConflict = true;
//       } else {
//         refreshUsers();
//          closeUserProfile();
//       }
//     });
//   };

}
