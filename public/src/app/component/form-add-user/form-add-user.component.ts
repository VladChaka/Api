import { Component, OnInit } from '@angular/core';

import { FormService } from '../../service/form.service';

@Component({
    selector: 'form-add-user',
    templateUrl: './form-add-user.component.html',
    styleUrls: ['./form-add-user.component.css']
})
export class FormAddUserComponent implements OnInit {

    constructor(protected formService: FormService,) { }

    ngOnInit() {
    }

    closeFormAddUser(): void {
        this.formService.closeFormAddUser();
    }

}
