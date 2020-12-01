import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private messageService: MessageService
  ) { 
    var firebaseConfig = {
      apiKey: "AIzaSyCGK4Yu4G8sw26lZu4atiMSHVYC-SsPrdk",
      authDomain: "course-registration-site.firebaseapp.com",
      databaseURL: "https://course-registration-site.firebaseio.com",
      projectId: "course-registration-site",
      storageBucket: "course-registration-site.appspot.com",
      messagingSenderId: "376200110721",
      appId: "1:376200110721:web:bca13372c9f20f20e72380",
      measurementId: "G-NK14KJ3CRW"
    };
    firebase.initializeApp(firebaseConfig);
  }

  isLoggedIn(): boolean {
    var user = firebase.auth().currentUser;

    return user ? true : false;
  }


  // return the first name of the user
  getName():string {
    return firebase.auth().currentUser.displayName.split(' ')[0];
  }

  getEmail(): string {
    return firebase.auth().currentUser.email;
  }

  async newAccount(email: string, password: string, name: string): Promise<void> {
    try {
      // try to create the account
      var response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(response);

      // if successful, add a name:
      await firebase.auth().currentUser.updateProfile({
        displayName: name
      });
    } catch (e) {
      console.log(e);
      this.messageService.alertRed(e);
    }
  }

  async login(email: string, password: string): Promise<void> { //TODO
    try {
      var response = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      this.messageService.alertGreen("You are now logged in!");
    } catch (e) {
      console.log(e);
      this.messageService.alertRed(e);
    }
  }

  async logout(): Promise<void> { //TODO
    await firebase.auth().signOut();
    this.messageService.alertGreen('You are now logged out!');
  }

  async updateName(name: string): Promise<any> {
    try {
      await firebase.auth().currentUser.updateProfile({
        displayName: name
      });

      return null;
    } catch(e) {
      return e;
    }
  }

  async updateEmail(email: string): Promise<any> {
    try {
      await firebase.auth().currentUser.updateEmail(email);

      return null;
    } catch(e) {
      return e;
    }
  }

  async updatePassword(password: string): Promise<any> {
    try {
      await firebase.auth().currentUser.updatePassword(password);

      return null;
    } catch(e) {
      return e;
    }
  }
}