import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../interfaces/users/user";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  private loggedUser: User = JSON.parse(localStorage.user);

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
