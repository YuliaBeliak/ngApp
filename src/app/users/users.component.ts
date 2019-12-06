import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { USERS } from "../mock-users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = USERS;

  public selectedUser: User;

  constructor() { }

  ngOnInit() {
  }

}
