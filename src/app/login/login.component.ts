import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  createAccountForm;

  constructor(
    public accountService: AccountService,
    private messageService: MessageService
  ) {
      this.createFormControls();
      this.createForm();
  }

  ngOnInit(): void {}

  createFormControls() {
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
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit():void {
    this.messageService.alertGreen('You are now logged in!');
    this.accountService.login(this.email.value, this.password.value);
  }
}
