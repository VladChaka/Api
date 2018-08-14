import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthenticationFormComponent } from "../component/authentication-form/authentication-form.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationFormComponent
  }
    // {
    //     path: '',
    //     redirectTo: '/dashboard',
    //     pathMatch: 'full'
    // },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }