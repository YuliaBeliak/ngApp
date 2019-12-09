import { Injectable } from '@angular/core';
import  { User } from "./user";
import { USERS } from "./mock-users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUser(id: string): User {
    return  USERS.find(el => el._id === id);
  }
}
