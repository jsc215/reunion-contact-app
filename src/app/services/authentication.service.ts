import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>('/api/users/login', { email: email,  password: password }, httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({user}));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    return this.http.delete('api/users/me/token', httpOptions);
    // remove user from local storage to log user out
  }
}
