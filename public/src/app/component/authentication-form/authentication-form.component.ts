import { Component } from '@angular/core';

import { AuthenticationService } from '../../service/authentication.service';
import { RemoteService } from '../../service/remote.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})



export class AuthenticationFormComponent {
    btnText: string = 'Enter';

    constructor(
        protected remoteService: RemoteService,
        protected authenticationService: AuthenticationService,
        protected tokenService: TokenService
    ) { }

    login(login, pass): void {
        this.authenticationService.authentication({
            username: login,
            password: pass
        });
    };

}
