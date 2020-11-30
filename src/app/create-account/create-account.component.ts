import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  nameVal: string = '';
  emailVal: string = '';
  passwordVal: string = '';

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  createAccount() {

  }
}
