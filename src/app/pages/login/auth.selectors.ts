import {createSelector} from "@ngrx/store";

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.isLoggedIn
);

export const loggedUser = createSelector(
  selectAuthState,
  auth => auth.user
);
