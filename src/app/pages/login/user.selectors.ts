import {createSelector} from "@ngrx/store";

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  user => user.isLoggedIn
);

export const loggedUser = createSelector(
  selectAuthState,
  user => user.user
);
