import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  newAccForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {
      this.createFormControls();
      this.createForm();
  }

  ngOnInit(): void {}

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.newAccForm = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if (this.newAccForm.valid) {
      const name:string = this.firstName.value + ' ' + this.lastName.value;
      this.accountService.newAccount(this.email.value, this.password.value, name);
    } else {
      this.messageService.alertRed('Correct the fields required!');
    }
  }

  onClose() {
    this.newAccForm.reset()
  }
}
