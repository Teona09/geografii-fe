import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token: string;
  private email: string;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token')
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  login(userName: string, password: string): void {
    const url = `http://localhost:8080/users/login`;
    this.http
      .post(url, {
        email: userName,
        password: password,
      })
      .subscribe(
        (result) => {
          localStorage.setItem("token", result['token']);
          localStorage.setItem("email", result['email']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
