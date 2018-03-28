import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.clear();
  }

  setAuth(user) {
    localStorage.setItem('token', user.token);
  }
}
