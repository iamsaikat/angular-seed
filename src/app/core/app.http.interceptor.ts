import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `jwt ${this.authService.getToken()}`
      },
      url: `${environment.api.rooturl}/${request.url}`
    });

    return next.handle(authRequest)
      .catch(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          this.router.navigate(['/']);
        }
        return Observable.throw(err);
      });
  }
}
