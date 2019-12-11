import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/users/user.service";
import { map } from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-detail-container',
  template: `
  <app-user-detail [user] = "user | async"></app-user-detail>
  `
})
export class UserDetailContainer implements OnInit {

  user: Observable<object>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser(id).pipe(
      map(e => e[0])
    );
  }
}
