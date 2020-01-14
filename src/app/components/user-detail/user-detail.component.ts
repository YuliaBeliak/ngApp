import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interfaces/users/user";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user?: User;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  get isMe(): boolean {
    if (this.user) {
      return this.user._id === this.authService.loggedUser._id;
    }
  }

  get userPic(): string {
    if (this.user) {
      if (this.user.pic) {
        return this.user.pic;
      }
    }
    return '../../../assets/img/default-profile.png';
  }
}
