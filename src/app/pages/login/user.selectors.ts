import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./user.state";
import {User} from "../../interfaces/users/user";

export const getUserState = createFeatureSelector<State>('user');

export const isLoggedIn = createSelector(
  getUserState,
  state => state ? state.isLoggedIn : false
);

export const loggedUser = createSelector(
  getUserState,
  state => state ? state.user : {} as User
);
