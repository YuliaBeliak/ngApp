import {Action} from "@ngrx/store";
import {LoginRes} from "../../interfaces/login/login-res";

export const AuthActionTypes = {
  GET_LOGIN_INFO: 'GET_LOGIN_INFO',
  LOG_OUT: 'LOG_OUT',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER'
};

export class GetLoginInfo implements Action {
  readonly type = AuthActionTypes.GET_LOGIN_INFO;

  constructor(public payload: LoginRes) {};
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOG_OUT;

  constructor(public payload?: any) {}
}

export class UpdateUser implements Action {
  readonly type = AuthActionTypes.UPDATE_USER;

  constructor(public payload: any) {}
}

export class DeleteUser implements Action{
  readonly type = AuthActionTypes.DELETE_USER;

  constructor(public payload?: any) {}
}

export type AuthActions = GetLoginInfo | LogOut | UpdateUser | DeleteUser;
