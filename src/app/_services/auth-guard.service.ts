import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.accountService.isLoggedIn()) {
      return true
    }

    this.router.navigate(['/']);
    this.messageService.alertRed('You must be logged in to view that page!');

    return false;
  }
}
