import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        'Authorization': `${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status) {
          console.log('error 401')
        }
        return throwError(error);
      })
    );
  }
}
