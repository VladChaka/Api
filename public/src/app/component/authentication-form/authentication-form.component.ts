import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})



export class AuthenticationFormComponent {
    btnText: string = 'Enter';

    constructor(protected authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }

    login(login, pass): void {
        let data = {
            username: login,
            password: pass
        }

        console.log(data)

        this.authenticationService.authentication(data)
        .subscribe((data) => {
            this.authenticationService.userAuthentication = true;
            localStorage['username'] = login;
            localStorage['password'] = pass;
            console.log(data);
        },
        (err) => {
            console.log(err);
            this.authenticationService.loginError = true;
            setTimeout(function () {
                this.authenticationService.loginError = false
            }, 4000)
        });
    };

}
