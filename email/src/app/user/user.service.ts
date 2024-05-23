import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/');
  }

  getEmail():Observable<any> {
    return this.http.get<any>('http://localhost:3000/emails');
  }

  createUser(userId: string, userName: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users', { userId, userName, password })
      .pipe(
        catchError(error => {
          console.error('Error creating user:', error);
          let errorMessage = 'An error occurred while creating the user.';
          if (error instanceof HttpErrorResponse && error.status === 201) {
            errorMessage = 'User created successfully, but the response is not in JSON format.';
          }
          return throwError(errorMessage);
        })
      );
  }

  sendEmail(emailId: string, emailTitle: string, emailBody: string, to: string,sendDate: string ): Observable<any> {
    return this.http.post<any>('http://localhost:3000/emails', { emailId, emailTitle, emailBody, to, sendDate})
      .pipe(
        catchError(error => {
          console.error('Error creating user:', error);
          let errorMessage = 'An error occurred while creating the user.';
          if (error instanceof HttpErrorResponse && error.status === 201) {
            errorMessage = 'User created successfully, but the response is not in JSON format.';
          }
          return throwError(errorMessage);
        })
      );
  }

}
