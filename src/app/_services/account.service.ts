import { Injectable } from '@angular/core';
import firebase from "firebase/app";

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
    const user = firebase.auth().currentUser;

    return user ? true : false;
  }


  /**
   * Returns the first name of the user.
   */
  getName():string {
    if (this.isLoggedIn)
      return firebase.auth().currentUser.displayName.split(' ')[0];
    else
      return '';
  }

  /**
   * Returns the email of the user.
   */
  getEmail(): string {
    return firebase.auth().currentUser.email;
  }

  getUid(): string {
    if (this.isLoggedIn()) {
      return firebase.auth().currentUser.uid;
    } else {
      return null;
    }
  }

  async getToken(): Promise<string> {
    try {
      return await firebase.auth().currentUser.getIdToken(true);
    } catch (e) {
      this.messageService.alertRed(e);
      return '';
    }
  }

  /**
   * Creates a new user in the database.
   * @param email the email in string form of the user.
   * @param password the password in string form of the user.
   * @param name the FULL name of the user.
   */
  async newAccount(email: string, password: string, name: string): Promise<any> {
    try {
      // try to create the account
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // if successful, add a name:
      await firebase.auth().currentUser.updateProfile({
        displayName: name
      });

      return null;
    } catch (e) {
      return e;
    }
  }

  async login(email: string, password: string): Promise<any> { //TODO
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      
      return null;
    } catch (e) {
      return e;
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
