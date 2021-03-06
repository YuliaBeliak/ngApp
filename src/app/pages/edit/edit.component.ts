import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../interfaces/users/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  get loggedUser$(): Observable<User> {
    return this.authService.loggedUser$;
  }

}
