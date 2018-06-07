import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users', httpOptions);
  }

  getById(_id: string) {
    return this.http.get('/api/users/' + _id);
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>('/api/users', newUser, httpOptions);
  }

  updateUser(newUser: User): Observable<User> {
    return this.http.put<User>('/api/users/' + newUser._id, newUser, httpOptions);
  }

  deleteUser(_id) {
    return this.http.delete(`/api/users/${_id}`, httpOptions);
  }
}

