import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { Course } from '../_models/Course';
import { Schedule } from '../_models/Schedule';
import { AccountService } from './account.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }


  /******* course methods *******/

  /**
   * Get all the available subject codes.
   */
  getAllSubjects(): Observable<string[]> {
    return this.http.get<string[]>('api/courses/subjects').pipe(
      tap(_ => console.log(`Got all subjects.`)),
      catchError(this.handleError)
    );
  }


  /******* schedule methods *******/
  async addSchedule(schedule: Schedule) {
    const uid = this.accountService.getUid();

    if (schedule.publicVis) {
      // Add to public schedule database

      // Add to private user list
    } else {
      // Add to private user list
      
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.messageService.alertRed(error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      const msg: string = `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`;
      console.error(msg);
      this.messageService.alertRed(msg);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
