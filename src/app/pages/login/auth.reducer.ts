import {AuthActions, AuthActionTypes} from "./auth.actions";
import {AuthState} from "./auth.state";

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  tokens: {
    access: undefined,
    refresh: undefined
  }
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.GET_LOGIN_INFO:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        tokens: action.payload.tokens
      };
    case AuthActionTypes.LOG_OUT:
      return {
        ...state,
        ...initialAuthState
      };
    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case AuthActionTypes.DELETE_USER:
      return {
        ...state,
        ...initialAuthState
      };
    case AuthActionTypes.CREATE_USER:
      return {
        ...state,
        ...initialAuthState
      };
    default:
      return state;
  }
}
