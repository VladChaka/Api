import { Component } from '@angular/core';

import { MainPageComponent } from '../../component/main-page/main-page.component';

import { AuthenticationService } from '../../service/authentication.service';
import { RemoteService } from '../../service/remote.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css'],
  provide: [MainPageComponent]
})



export class AuthenticationFormComponent {
    btnText: string = 'Enter';

    constructor(
        protected mainPageComponent: MainPageComponent,
        protected remoteService: RemoteService,
        protected authenticationService: AuthenticationService,
        protected tokenService: TokenService
    ) { }

    login(login, pass): void {
        let a = this.authenticationService.authentication({
            username: login,
            password: pass
        });

        if (a === true) {
            this.mainPageComponent.getUsers();
        }
    };

}
