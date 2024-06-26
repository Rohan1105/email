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
    return this.http.get<any>(`${"https://email-fdj2.onrender.com"}/users`);
  }

  getEmail():Observable<any> {
    return this.http.get<any>(`${"https://email-fdj2.onrender.com"}/emails`);
  }

  createUser(userId: string, userName: string, password: string): Observable<any> {
    return this.http.post<any>(`${"https://email-fdj2.onrender.com"}/users`, { userId, userName, password })
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

  sendEmail(emailId: string, emailTitle: string, emailBody: string, to: string,sendDate: string ,type : string): Observable<any> {
    return this.http.post<any>(`${"https://email-fdj2.onrender.com"}/emails`, { emailId, emailTitle, emailBody, to, sendDate,type})
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
