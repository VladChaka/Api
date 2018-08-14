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
            localStorage['token'] = authenticationInfo.token;
        },
        (err) => {
            this.loginError = true;
            setTimeout(function () {
                this.loginError = false
                console.log('I m done');
            }, 4000);
        });
    }

    isAuthentication() {
        console.log('asdfasdfas');
        if (localStorage['token'] !== undefined) this.userAuthentication = true;
    }

    logout(): void {
        delete localStorage['token'];
        this.tokenService.setToken(null);
        this.userAuthentication = false;
    }
}
