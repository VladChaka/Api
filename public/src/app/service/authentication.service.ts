import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteService } from './remote.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    userAuthentication = false;

    loginError: boolean = false;

    constructor(
        protected remoteService: RemoteService,
        protected tokenService: TokenService
    ) { }

    authentication(authenticationInfo): void {
        this.remoteService.authentication(authenticationInfo).subscribe((data) => {
            console.log(data);
            this.tokenService.setToken(data.token);
            this.userAuthentication = true;
            localStorage['username'] = authenticationInfo.username;
            localStorage['password'] = authenticationInfo.password;
        },
        (err) => {
            this.loginError = true;
            setTimeout(function () {
                this.loginError = false
            }, 4000)
        });;
    }

    logout(): void {
        delete localStorage['username'];
        delete localStorage['password'];
        this.tokenService.setToken(null);
        this.userAuthentication = false;
    }
}
