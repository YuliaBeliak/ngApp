import {Action} from "@ngrx/store";
import {LoginRes} from "../../interfaces/login/login-res";
import {User} from "../../interfaces/users/user";

export const ActionTypes = {
  GET_LOGIN_INFO: 'GET_LOGIN_INFO',
  LOG_OUT: 'LOG_OUT',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  CREATE_USER: 'CREATE_USER'
};

export class GetLoginInfo implements Action {
  readonly type = ActionTypes.GET_LOGIN_INFO;

  constructor(public payload: LoginRes) {};
}

export class LogOut implements Action {
  readonly type = ActionTypes.LOG_OUT;

  constructor(public payload?: any) {}
}

export class UpdateUser implements Action {
  readonly type = ActionTypes.UPDATE_USER;

  constructor(public payload: any) {}
}

export class DeleteUser implements Action {
  readonly type = ActionTypes.DELETE_USER;

  constructor(public payload?: any) {}
}

export class CreateUser implements Action {
  readonly type = ActionTypes.CREATE_USER;

  constructor(public payload?: User) {}
}

export type UserActions = GetLoginInfo | LogOut | UpdateUser | DeleteUser | CreateUser;
