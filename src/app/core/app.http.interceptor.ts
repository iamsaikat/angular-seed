
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';




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

    return next.handle(authRequest);
  }
}
