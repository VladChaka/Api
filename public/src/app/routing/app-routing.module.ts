import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from '../component/main-page/main-page.component';
import { AuthorizationFormComponent } from "../component/authorization-form/authorization-form.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthorizationFormComponent
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
