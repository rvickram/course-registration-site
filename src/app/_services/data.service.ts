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

  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiCourses: string = 'api/courses';
  private apiSchedules: string = 'api/schedules';

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
    return this.http.get<string[]>(`${this.apiCourses}/subjects`).pipe(
      tap(_ => console.log(`Got all subjects.`)),
      catchError(this.handleError)
    );
  }

  getAllCourses(subjCode: string): Observable<any> {
    if (!subjCode.trim()) { return of([]); }

    return this.http.get(`${this.apiCourses}/subjects/${subjCode}`).pipe(
      tap(_ => console.log(`Got all course codes.`)),
      catchError(this.handleError)
    );
  }

  searchCourses(subject: string, courseCode: string, courseComp?: string): Observable<any> {
    // make sure search strings aren't empty
    if (!subject.trim() || !courseCode.trim()) { return of([]); }

    var apiUrl = `api/courses/timetable?subject=${subject}&catalog_nbr=${courseCode}`;
    if (courseComp) apiUrl += `&ssr_component=${courseComp}`;

    // query database
    return this.http.get(apiUrl).pipe(
      tap(_ => console.log(`Got search results.`)),
      catchError(this.handleError)
    );
  }


  /******* schedule methods *******/
  getUserSchedules(): Observable<any> {
    return this.http.get<any>(this.apiSchedules + '/users', this.authHeaders()).pipe(
      tap(_ => console.log('Retrieved all user schedules.')),
      catchError(this.handleError)
    );
  }

  setUserSchedule(schedule: Schedule): Observable<any> {
    return this.http.put<any>(this.apiSchedules + '/users', schedule, this.authHeaders()).pipe(
      tap(_ => console.log('Saved user schedule.')),
      catchError(this.handleError)
    );
  }

  deleteUserSchedule(schedName: string): Observable<any> {
    return this.http.delete(`${this.apiSchedules}/users/${schedName}`, this.authHeaders()).pipe(
      tap(_ => console.log(`Deleted \'${schedName}\' schedule.`)),
      catchError(this.handleError)
    );
  }


  // 
  handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.messageService.alertRed(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      let msg: string = `Backend returned code ${error.status}, `;
      const errMsg: string = error.error.error;

      msg += errMsg ? `body was: ${error.error.error}` : `body was: ${error.error}`;
      this.messageService.alertRed(msg);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  authHeaders() {
    return { 
      headers: new HttpHeaders({ 
        'content-type': 'application/json',
        Authorization: `Bearer ${this.accountService.userIdToken}`
      })
    }
  }
}
