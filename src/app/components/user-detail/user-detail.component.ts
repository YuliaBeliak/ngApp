import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interfaces/users/user";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  @Input() user?: User;
  loggedUser: User;
  private subs: Subscription[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.setLoggedUser()
  }

  get userPic(): string {
    if (this.user) {
      if (this.user.pic) {
        return this.user.pic;
      }
    }
    return '../../../assets/img/default-profile.png';
  }

  get isMe(): boolean {
    if (this.user) {
      return this.user._id === this.loggedUser._id
    }
  }

  setLoggedUser(): void {
    const sub = this.authService.loggedUser$.subscribe((value: User) => this.loggedUser = value);
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((el: Subscription) => el.unsubscribe())
  }
}
