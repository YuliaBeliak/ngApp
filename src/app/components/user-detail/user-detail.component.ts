import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/users/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;

  constructor() { }

  ngOnInit() { }

  isMe(): boolean {
    if (this.user) {
      return this.user._id === JSON.parse(localStorage.user)._id;
    }
  }
}
