import {User} from "../users/user";
import {Token} from "../token/token";

export interface LoginRes {
  user: User,
  tokens: {
    access: Token
    refresh: Token
  }
}
