import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn: boolean = false;
  private name: string = 'Beanu'; //TODO

  constructor(private messageService: MessageService) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getName():string {
    return this.name;
  }

  login(username: string, password: string): void { //TODO
    this.loggedIn = true;
  }

  logout(): void { //TODO
    this.loggedIn = false;
    this.name = '';
    this.messageService.alertGreen('You are now logged out!');
  }
}
