import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormService {
  showUserProfile: boolean = false;
  showFormAddUser: boolean = false;
  userAuthorized: any = null;
  
  constructor() { }

  openAddForm(): void {
    this.showFormAddUser = true;
  }

  closeFormAddUser(): void {
    this.showFormAddUser = false;
    // this.emailConflict = false;
    // this.loginConflict = false;
    // this.formAddUser = {};
  }
}
