import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {ActionTypes, GetLoginInfo, GetLoginInfoFailure, GetLoginInfoSuccess, UpdateUser} from "./user.actions";
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
  }

  @Effect()
  getUserInfo = this.actions$.pipe(
    ofType<GetLoginInfo>(ActionTypes.GET_LOGIN_INFO),
    switchMap((action) => this.authService.login(action.payload)),
    switchMap((data) => {
      this.authService.saveToken(data.tokens.access, 'access');
      this.authService.saveToken(data.tokens.refresh, 'refresh');
      this.router.navigate(['me']);
      return of(new GetLoginInfoSuccess(data))
    }),
    catchError(() => of(new GetLoginInfoFailure()))
  );

  // @Effect()
  // updateUser = this.actions$.pipe(
  //   ofType<UpdateUser>(ActionTypes.UPDATE_USER),
  //   switchMap((action) => this.userService.updateUser(action.payload.id, action.payload.dataToUpdate)),
  //   switchMap((data) => {
  //     this.authService.saveToken(data.tokens.access, 'access');
  //     this.authService.saveToken(data.tokens.refresh, 'refresh');
  //     this.router.navigate(['me']);
  //     return of(new GetLoginInfoSuccess(data))
  //   }),
  //   catchError(() => of(new GetLoginInfoFailure()))
  // );


}
