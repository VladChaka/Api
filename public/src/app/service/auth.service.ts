import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authenticationLogin: string = 'asdasdasdas';
    authenticationPass: string = 'asdasdasdas';

    constructor() { }

    Authentication(remoteService): object {
        let authenticationInfo = {
            username: this.authenticationLogin,
            password: this.authenticationPass
        };
        return remoteService.auth.save(authenticationInfo);
    }
}
