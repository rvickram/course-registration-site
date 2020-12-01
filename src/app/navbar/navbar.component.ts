import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout();
    this._router.navigateByUrl('/home');
  }

}
