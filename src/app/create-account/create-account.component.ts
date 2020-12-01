import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  // stores a message to display to the user:
  @ViewChild('closeNewAccModal') closebutton;
  modalMessages: string[] = [];


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

  async onSubmit(): Promise<void> {
    if (this.newAccForm.valid) {
      const parsedName: string = this.firstName.value + ' ' + this.lastName.value;
      const response = await this.accountService.newAccount(this.email.value, this.password.value, parsedName);

      if (response) {
        this.modalMessages.push(response);
      }
      else {
        this.messageService.alertGreen('You\'ve created a new account!');
        this.closebutton.nativeElement.click();
      }
    } else {
      this.modalMessages.push("Make sure all fields are correct!");
    }
  }

  onClose() {
    this.newAccForm.reset()
    this.modalMessages = [];
  }
}
