import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout();
  }

}
