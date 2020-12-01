import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  constructor() { }

  public alertRed(message: string, title: string = "Success"):void {
    const newMsg: Message = new Message(title, message, 'alert-danger');
    this.messages.push(newMsg);
  }

  public alertGreen(message: string, title: string = "Success"):void {
    const newMsg: Message = new Message(title, message, 'alert-success');
    this.messages.push(newMsg);
  }
}
