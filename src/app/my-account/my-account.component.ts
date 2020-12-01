import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  updateEmailForm: FormGroup;
  updateNameForm: FormGroup;
  updatePasswordForm: FormGroup;

  name: FormControl;
  email: FormControl;
  password: FormControl;

  constructor(
    public accountService: AccountService,
    private messageService: MessageService
  ) {
    this.createFormControls();
    this.createForm();

    // this.fillCurrentFields(); //TODO fix this!
  }

  ngOnInit(): void {}

  private createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  private createForm() {
    this.updateNameForm = new FormGroup({name: this.name});

    this.updateEmailForm = new FormGroup({email: this.email});

    this.updatePasswordForm = new FormGroup({password: this.password});
  }

  async updateName() {
    if (this.updateNameForm.valid) {
      const result = await this.accountService.updateName(this.name.value);

      if (await result) {
        this.messageService.alertRed(result);
      } else {
        this.messageService.alertGreen('Updated your name.');
      }
    } else {
      this.messageService.alertRed('Make sure all fields are valid first.');
    }
  }

  async updateEmail() {
    if (this.updateEmailForm.valid) {
      const result = await this.accountService.updateEmail(this.email.value);

      if (await result) {
        this.messageService.alertRed(result);
      } else {
        this.messageService.alertGreen('Updated your email.');
      }
    } else {
      this.messageService.alertRed('Make sure all fields are valid first.');
    }
  }

  async updatePassword() {
    if (this.updatePasswordForm.valid) {
      const result = await this.accountService.updatePassword(this.password.value);

      if (await result) {
        this.messageService.alertRed(result);
      } else {
        this.messageService.alertGreen('Updated your password.');
      }
    } else {
      this.messageService.alertRed('Make sure all fields are valid first.');
    }
  }

}
