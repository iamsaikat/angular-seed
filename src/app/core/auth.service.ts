import { BehaviorSubject ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.clear();
  }

  setAuth(user: any) {
    localStorage.setItem('token', user.token);
  }
}
