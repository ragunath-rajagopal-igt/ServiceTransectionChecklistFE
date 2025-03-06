import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add Authorization token to the request if it exists
    const token = this.authService.getToken(); // Get token from the auth service
    const organizationCode = this.authService.getOrgCode(); // Get organization code

    let authReq = req;
    if (token) {
      authReq = this.addTokenHeader(req, token, organizationCode);
    }

    // Handle request and response
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !authReq.url.includes('/auth/login') && !req.url.includes('/auth/refresh-token')) {

          // If unauthorized, attempt to refresh the token
          return this.handle401Error(authReq, next);
        } 
        // Other error handling
        return this.handleError(error);
      }),
      finalize(() => {
        // You can do something after the request completes (optional)
      })
    );
  }

  // Add Token Header
  private addTokenHeader(request: HttpRequest<any>, token: string, orgCode: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        organizationCode: orgCode,
      }
    });
  }

  // Handle 401 Error
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.apiService.refreshToken().pipe(
        switchMap((newToken: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken);
          return next.handle(this.addTokenHeader(request, newToken, this.authService.getOrgCode()));
        }),
        catchError((err) => {
          // this.isRefreshing = false;
          this.apiService.logout();
          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token as string, this.authService.getOrgCode())))
      );
    }
  }

  //Handle Error
  private handleError(error: HttpErrorResponse) {
    let errorResponse = {
      status: error.status,
      message: error.message,
      error: error.error || error.statusText // Include the error response from the server
    };

    if (error.status === 401) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    return throwError(() => errorResponse);
  }
}
