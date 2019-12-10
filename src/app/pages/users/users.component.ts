import { Component, OnInit } from '@angular/core';
import { User } from "../../interfaces/users/user";
import { USERS } from "../../mocks/users/mock-users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = USERS;

  constructor() { }

  ngOnInit() {
  }

}
