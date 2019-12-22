import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, mapTo, tap} from "rxjs/operators";
import {LoginReq} from "../../interfaces/login/login-req";
import {LoginRes} from "../../interfaces/login/login-res";
import {User} from "../../interfaces/users/user";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";

class loginRes {
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'http://localhost:3000/users';
  public isLogged: boolean;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
  }

  login(loginData: LoginReq): Observable<loginRes> {
    return this.http.post<any>(`${this.usersUrl}/login`, loginData)
      .pipe(
        map((res: LoginRes) => {
          localStorage.setItem('access', res.tokens.accessToken);
          localStorage.setItem('exp', res.tokens.exp.toString());
          localStorage.setItem('refresh', res.tokens.refreshToken);
          localStorage.setItem('user', JSON.stringify(res.user[0]));
          return res;
          }
        ));
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('exp');
    localStorage.removeItem('user');
    this.router.navigate(['login'])

  }

  isAuthenticated(): boolean {
    return (localStorage.getItem('access')
      && localStorage.getItem('refresh')
      && localStorage.getItem('user')
      && Date.now() < (+localStorage.getItem('exp') * 1000)
    );
  }
}
