import {Action} from "@ngrx/store";
import {LoginRes} from "../../interfaces/login/login-res";
import {User} from "../../interfaces/users/user";
import {LoginReq} from "../../interfaces/login/login-req";

export const ActionTypes = {
  GET_LOGIN_INFO: 'GET_LOGIN_INFO',
  GET_LOGIN_INFO_SUCCESS: 'GET_LOGIN_INFO_SUCCESS',
  GET_LOGIN_INFO_FAILURE: 'GET_LOGIN_INFO_FAILURE',
  LOG_OUT: 'LOG_OUT',
  GET_UPDATE_USER: 'GET_UPDATE_USER',
  GET_UPDATE_USER_SUCCESS: 'GET_UPDATE_USER_SUCCESS',
  GET_UPDATE_USER_FAILURE: 'GET_UPDATE_USER_FAILURE',
  DELETE_USER: 'DELETE_USER',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',
  CREATE_USER: 'CREATE_USER',
};

export class GetLoginInfo implements Action {
  readonly type = ActionTypes.GET_LOGIN_INFO;

  constructor(public payload: LoginReq) {
  };
}

export class GetLoginInfoSuccess implements Action {
  readonly type = ActionTypes.GET_LOGIN_INFO_SUCCESS;

  constructor(public payload: LoginRes) {
  };
}

export class GetLoginInfoFailure implements Action {
  readonly type = ActionTypes.GET_LOGIN_INFO_FAILURE;

  constructor(public payload?: any) {
  };
}

export class LogOut implements Action {
  readonly type = ActionTypes.LOG_OUT;

  constructor(public payload?: any) {
  }
}

export class GetUpdateUser implements Action {
  readonly type = ActionTypes.GET_UPDATE_USER;

  constructor(public payload: { id: string, dataToUpdate: any }) {
  }
}

export class GetUpdateUserSuccess implements Action {
  readonly type = ActionTypes.GET_UPDATE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUpdateUserFailure implements Action {
  readonly type = ActionTypes.GET_UPDATE_USER_FAILURE;

  constructor(public payload?: any) {
  }
}

export class DeleteUser implements Action {
  readonly type = ActionTypes.DELETE_USER;

  constructor(public payload: string) {
  }
}

export class DeleteUserFailure implements Action {
  readonly type = ActionTypes.DELETE_USER_FAILURE;

  constructor(public payload?: any) {
  }
}

export class CreateUser implements Action {
  readonly type = ActionTypes.CREATE_USER;

  constructor(public payload: User) {
  }
}

export type UserActions =
  GetLoginInfo
  | GetLoginInfoSuccess
  | GetLoginInfoFailure
  | LogOut
  | GetUpdateUser
  | GetUpdateUserSuccess
  | GetUpdateUserFailure
  | DeleteUser
  | DeleteUserFailure
  | CreateUser
