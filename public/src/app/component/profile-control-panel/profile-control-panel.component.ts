import { Component, OnInit } from '@angular/core';

import { FormService } from '../../service/form.service';

@Component({
  selector: 'profile-control-panel',
  templateUrl: './profile-control-panel.component.html',
  styleUrls: ['./profile-control-panel.component.css']
})
export class ProfileControlPanelComponent {

    constructor(
        protected formService: FormService
    ) {}
    
    openUserProfile(): void {
        this.formService.openUserProfile();
    }
    
    openLibraryCard(): void {
        this.formService.openLibraryCard();
    }
 }
