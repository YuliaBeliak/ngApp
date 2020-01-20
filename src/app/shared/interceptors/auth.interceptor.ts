import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";
import {catchError, concatMap, switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isAuthenticated: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.subscribe(value => {
      this.isAuthenticated = value;
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthenticated || req.url.includes('token')) {
      return next.handle(this.adjustRequestHeader(req))
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              if (!this.authService.isTokenNotExpired('refresh')) {
                this.authService.logout();
                return;
              }
            }
            return this.authService.refreshAccessToken().pipe(
              switchMap(() => next.handle(this.adjustRequestHeader(req)))
            );
          })
        )
    } else {
      return next.handle(req);
    }

  }

  adjustRequestHeader(req): HttpRequest<any> {
    return req.clone({
      headers: req.headers.append('Authorization', `Bearer ${this.authService.getToken('access').token}`)
    });
  }
}
