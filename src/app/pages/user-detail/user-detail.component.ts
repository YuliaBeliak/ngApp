import { Component, OnInit} from '@angular/core';
import { User } from "../../interfaces/users/user";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/users/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser(id);
  }
}
