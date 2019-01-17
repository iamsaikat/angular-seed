import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



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
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // console.log(' all looks good');
          // http response status code
          // console.log(event.status);
          return event;
        }
      }, error => {
       // http response status code
       if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.error('Error status code:', error);
        }
    }
      })
    );
  }
}