import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userBaseUrl } from '../constants/constants';
import { User } from '../models/user.model';
import { HttpUtils } from '../utils/http.utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = userBaseUrl;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(
      url,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        roleModel: 'basic',
      },
      { observe: 'response' }
    );
  }

  getUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/getByEmail?email=${email}`;
    return this.http.get(url);
  }

  update(user: User): Observable<any> {
    const url = `${this.baseUrl}/update`;
    return this.http.post(url, user);
  }

  resetPassword(id: number, password: string): Observable<any>{
    const url = `${this.baseUrl}/password/${id}`;
    const params = HttpUtils.setParams(password, "");
    return this.http.post(url,{params});
  }

  delete(id: number):Observable<any>{
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}
