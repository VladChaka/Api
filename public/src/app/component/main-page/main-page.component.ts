import { Component, OnInit } from '@angular/core';

import { Users } from '../../model/users';

import { UserService } from '../../service/user.service';
import { FormService } from '../../service/form.service';
import { RemoteService } from '../../service/remote.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    constructor(
        protected userService: UserService,
        protected formService: FormService,
        protected remoteService: RemoteService
    ) { }

    users: Users[];
    countUsers: number;

    showUserProfile: boolean;
    showFormAddUser: boolean;
    userAuthorized: any;

    currentPage: number = 1;
    numberOfPages: number = 1;
    pageSize: number = 15;

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
        // this.showFormAddUser = this.formService.showFormAddUser;
    }

    logout(): void {
        console.log('Login');
    }

    addUser(): void {
      // usersService.addUser(uc.formAddUser, function(response) {
      //   if (response.status === 500) {
      //     let errorType = response.data.error.split("$")[1].split('_')[0];
      //     if (errorType === "username") {
      //       uc.emailConflict = false;
      //       uc.loginConflict = true;
      //     } else if (errorType === "email") {
      //       uc.emailConflict = true;
      //       uc.loginConflict = false;
      //     }
      //   } else {
      //     refreshUsers();
      //     uc.closeFormAddUser();
      //     uc.showFormAddUser = false;
      //   }
      // });
    };
//
//   function refreshUsers() {
//     usersService.getAllUsers().then(function(users) {
//       uc.users = users;
//
//       uc.users.map((element) => {
//         let date = element.regDate * 1,
//           newDate = new Date(date),
//           day = newDate.getDate(),
//           month = newDate.getMonth() + 1,
//           year = newDate.getFullYear();
//
//         element.regDate = day + '.' + month + '.' + year;
//       })
//
//       uc.numberOfPages = Math.ceil(uc.users.length / uc.pageSize);
//     })
//   }
//
//   uc.login = function() {
//     authentication.authentication(uc.authenticationLogin, uc.authenticationPass, function (response) {
//       if (response.status === 400) {
//         uc.loginError = true;
//         $timeout(function () {
//           uc.loginError = false
//         }, 4000)
//       } else {
//         localStorage['login'] = uc.authenticationLogin;
//         localStorage['pass'] = uc.authenticationPass;
//         refreshUsers();
//         tokenService.setToken(response.token);
//         uc.userAuthorized = true;
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
//           uc.userAuthorized = true;
//         } else {
//           uc.userAuthorized = false
//         }
//       });
//     } else {uc.userAuthorized = false}
//   })();
//
//   uc.logout = function() {
//     delete localStorage['login'];
//     delete localStorage['pass'];
//     uc.users = undefined;
//     tokenService.setToken(null);
//     uc.userAuthorized = false;
//   };
//
//   uc.openUserProfile = function(userId) {
//     usersService.getOneUser(userId, function(userInfo) {
//       uc.userProfile = userInfo;
//       uc.showUserProfile = true;
//     });
//   };
//
//   uc.closeUserProfile = function(){
//     uc.showUserProfile = false;
//     uc.emailConflict = false;
//   };
//
//   uc.deleteUser = function(userId) {
//     usersService.deleteUser(userId).then(function () {
//       refreshUsers();
//     })
//   };
//
//   uc.editUser = function() {
//     var user = {
//       id: uc.userProfile._id,
//       email: uc.userProfile.email,
//       post: uc.userProfile.post,
//       phone: uc.userProfile.phone,
//       fullname: uc.userProfile.fullname
//     };
//
//     if (uc.userProfile.password !== undefined && uc.userProfile.password.length !== 0) {
//       user.password = uc.userProfile.password;
//     }
//
//     usersService.editUser(user, function(response) {
//       if (response.status === 500) {
//         uc.emailConflict = true;
//       } else {
//         refreshUsers();
//         uc.closeUserProfile();
//       }
//     });
//   };

}
