import {User} from "../../interfaces/users/user";
import {Token} from "../../interfaces/token/token";

  export interface AuthState {
  isLoggedIn: boolean,
  user: User,
  tokens: {
    access: Token,
    refresh: Token
  }
}
