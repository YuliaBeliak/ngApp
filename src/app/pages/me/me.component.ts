import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../interfaces/users/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get loggedUser$(): Observable<User> {
    return this.authService.loggedUser$;
  }

}
