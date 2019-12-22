import {User} from "../users/user";

export interface LoginRes {
  user: User[],
  tokens: {
    accessToken: string
    refreshToken: string
    exp: number;
  }
}
