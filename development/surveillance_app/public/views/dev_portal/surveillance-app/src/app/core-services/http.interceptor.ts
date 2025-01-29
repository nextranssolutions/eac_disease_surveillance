import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, trigger token refresh
          return this.authService.refreshAccessToken().pipe(
            catchError((refreshError: any) => {
              // If refresh fails, log out the user or perform other actions
              this.authService.funcUserLogOut();
              return throwError(refreshError);
            }),
            switchMap(() => {
              // Retry the original request with the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.refreshAccessToken()}` // Update to use getToken
                }
              });
              return next.handle(newRequest);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}