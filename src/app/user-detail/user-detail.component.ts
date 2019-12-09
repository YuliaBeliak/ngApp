import { Component, OnInit, Input } from '@angular/core';
import { User } from "../user";
import { USERS } from "../mock-users";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.user = USERS.find(el => el._id === params.get('id'));
    })
  }
}
