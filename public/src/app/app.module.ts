import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';

import { MainPageComponent } from './component/main-page/main-page.component';
import { FormAddUserComponent } from './component/form-add-user/form-add-user.component';
import { LoginValidationDirective } from './directive/login-validation.directive';
import { AuthenticationFormComponent } from './component/authentication-form/authentication-form.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ProfileControlPanelComponent } from './component/profile-control-panel/profile-control-panel.component';
import { LibraryCardComponent } from './component/library-card/library-card.component';

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
  bootstrap: [MainPageComponent]
})
export class AppModule { }
