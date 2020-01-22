import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginReq} from "../../interfaces/login/login-req";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";
import {Token} from "../../interfaces/token/token";
import {LoginRes} from "../../interfaces/login/login-res";
import {tap} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {isLoggedIn, loggedUser} from "../../pages/login/user.selectors";
import {State} from "../../pages/login/user.state";
import {User} from "../../interfaces/users/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private store: Store<State>
  ) {
  }

  login(loginData: LoginReq): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.usersUrl}/login`, loginData);
  }

  logout() {
    this.removeToken('access');
    this.removeToken('refresh');
    this.router.navigate(['login'])
  }

  saveToken(token: Token, tokenName: string): void {
    localStorage.setItem(tokenName, JSON.stringify(token));
  }

  removeToken(tokenName: string): void {
    localStorage.removeItem(tokenName);
  }

  getToken(tokenName: string): Token {
    return JSON.parse(localStorage.getItem(tokenName))
  }

  isTokenNotExpired(tokenName: string): boolean {
    return Date.now() < (+this.getToken(tokenName).expiryDate * 1000);
  }

  refreshAccessToken() {
    return this.http.post<Token>(`${this.usersUrl}/token`, this.getToken('refresh'))
      .pipe(
        tap(value => {
          this.saveToken(value, 'access');
        })
      );
  }

  get loggedUser$(): Observable<User> {
    return this.store.pipe(
      select(loggedUser)
    );
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn)
    );
  }
}
