import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  constructor() { }

  public alertRed(title: string = "Error", message: string):void {
    const newMsg: Message = new Message(title, message, 'alert-danger');
    this.messages.push(newMsg);
  }

  public alertGreen(title: string = "Success", message: string):void {
    const newMsg: Message = new Message(title, message, 'alert-success');
    this.messages.push(newMsg);
  }
}
