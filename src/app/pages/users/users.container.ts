import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/users/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users-container',
  template: `
  <app-users [users] = "users | async"></app-users>
  `
})
export class UsersContainer implements OnInit {

  public users: Observable<object>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
