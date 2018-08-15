import { Injectable } from '@angular/core';
import { Route } from '@angular/router'
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
        protected tokenService: TokenService,
        protected route: Route
    ) { }

    authentication(authenticationInfo): Observable<any> {
        return this.remoteService.authentication(authenticationInfo);
    }

    isAuthentication(): any {
        // console.log(this.route);
        
        if (localStorage['token'] !== undefined) this.userAuthentication = true;
    }

    logout(): void {
        delete localStorage['token'];
        this.tokenService.setToken(null);
        this.userAuthentication = false;
    }
}
