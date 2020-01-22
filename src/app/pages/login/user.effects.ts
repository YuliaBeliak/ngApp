import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {
  ActionTypes, DeleteUser, DeleteUserFailure,
  GetLoginInfo,
  GetLoginInfoFailure,
  GetLoginInfoSuccess,
  GetUpdateUser, GetUpdateUserFailure,
  GetUpdateUserSuccess, LogOut
} from "./user.actions";
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

  @Effect()
  updateUser = this.actions$.pipe(
    ofType<GetUpdateUser>(ActionTypes.GET_UPDATE_USER),
    switchMap((action) => this.userService.updateUser(action.payload.id, action.payload.dataToUpdate)),
    switchMap((data) => {
      this.router.navigate(['me']);
      return of(new GetUpdateUserSuccess(data))
    }),
    catchError(() => of(new GetUpdateUserFailure()))
  );

  @Effect()
  deleteUser = this.actions$.pipe(
    ofType<DeleteUser>(ActionTypes.DELETE_USER),
    switchMap((action) => this.userService.deleteUser(action.payload)),
    switchMap(() => {
      return of(new LogOut())
    }),
    catchError(() => of(new DeleteUserFailure()))
  );

  @Effect()
  logOut = this.actions$.pipe(
    ofType<LogOut>(ActionTypes.LOG_OUT),
    switchMap(() => {
      this.authService.logout();
      return of(new GetLoginInfoFailure())
    })
  );


}
