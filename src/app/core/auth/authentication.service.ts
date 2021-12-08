import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  login(userName: string, password: string) {
    const url = `http://localhost:8080/users/login`;
    this.http
      .post(
        url,
        {
          email: userName,
          password: password,
        },
        httpOptions
      )
      .subscribe(
        (data) => {
          this.tokenStorage.saveToken(data['token']);
          this.tokenStorage.saveUser(data['email']);
          this.router.navigate(['/main']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  logout() {
    this.tokenStorage.signOut();
  }
}
