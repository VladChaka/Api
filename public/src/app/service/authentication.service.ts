import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RemoteService } from './remote.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    userAuthorized = false;
    
    loginError: boolean = false;

    constructor(
        protected remoteService: RemoteService,
        protected tokenService: TokenService
    ) { }

    authentication(authenticationInfo : object): Observable<any> {
        return this.remoteService.auth(authenticationInfo);
    }

    logout(): void {
        for (const key in localStorage) {
            delete localStorage[key];
        }
        // delete localStorage['login'];
        // delete localStorage['pass'];
        this.tokenService.setToken(null);
        this.userAuthorized = false;
    }

    // authentication(remoteService): object {
    //     let authenticationInfo = {
    //         username: this.authenticationLogin,
    //         password: this.authenticationPass
    //     };
    //     return remoteService.auth.save(authenticationInfo);
    // }

    
}
