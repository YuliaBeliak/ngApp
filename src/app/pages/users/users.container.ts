import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/users/user.service";
import {Observable} from "rxjs";
import {User} from "../../interfaces/users/user";

@Component({
  selector: 'app-users-container',
  template: `
  <app-users [users] = "users | async"></app-users>
  `
})
export class UsersContainer implements OnInit {

  users: Observable<User[]>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

}
