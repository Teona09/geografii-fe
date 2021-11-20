import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private token!: string;
  private email!: string;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return this.token;
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
          this.email = result['email'];
          this.token = result['token'];
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
