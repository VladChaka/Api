import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})



export class AuthenticationFormComponent implements OnInit {
    // userAuthorized = this.authenticationService.userAuthorized; не работает
    btnText: string = 'Enter';

    constructor(protected authenticationService: AuthenticationService) { 

    }

    ngOnInit() {
        console.log(localStorage);
        console.log(localStorage.length);
        
        if (localStorage['username'] !== undefined && localStorage['password'] !== undefined) {
            this.authenticationService.userAuthorized = true;
            this.login(localStorage['username'], localStorage['password'])
        };
    }

    login(login, pass): void {
        let authenticationInfo = {
            username: login,
            password: pass
        }
        
        this.authenticationService.authentication(authenticationInfo)
        .subscribe((data) => {
            localStorage['username'] = login;
            localStorage['password'] = pass;
            this.authenticationService.userAuthorized = true;
            console.log(data);
        },
        (err) => {
            console.log(err);
            this.authenticationService.loginError = true;
            setTimeout(function () {
                this.authenticationService.loginError = false
            }, 4000)
        });


        // , function (response) {
        //     if (response.status === 400) {
        //         this.authenticationService.loginError = true;
                // $timeout(function () {
                //     this.authenticationService.loginError = false
                // }, 4000)
        //     } else {
        //         // localStorage['login'] = this.authenticationLogin;
        //         // localStorage['pass'] = this.authenticationPass;
        //         // refreshUsers();
        //         // tokenService.setToken(response.token);
        //         this.authenticationService.userAuthorized = true;
        //     }
        // }
    };

}
