import {UserActions, ActionTypes} from "./user.actions";
import {State} from "./user.state";

export const initialState: State = {
  isLoggedIn: false,
  user: undefined,
  tokens: {
    access: undefined,
    refresh: undefined
  }
};

export function userReducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case ActionTypes.GET_LOGIN_INFO:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        tokens: action.payload.tokens
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        ...initialState
      };
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        },
      };
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        ...initialState
      };
    case ActionTypes.CREATE_USER:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
}
