import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';

import { AuthenticationFormComponent } from './component/authentication-form/authentication-form.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { FormAddUserComponent } from './component/form-add-user/form-add-user.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ProfileControlPanelComponent } from './component/profile-control-panel/profile-control-panel.component';
import { LibraryCardComponent } from './component/library-card/library-card.component';

import { LoginValidationDirective } from './directive/login-validation.directive';

@NgModule({
  declarations: [
    MainPageComponent,
    FormAddUserComponent,
    LoginValidationDirective,
    AuthenticationFormComponent,
    UserProfileComponent,
    ProfileControlPanelComponent,
    LibraryCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AuthenticationFormComponent]// MainPageComponent
})
export class AppModule { }
