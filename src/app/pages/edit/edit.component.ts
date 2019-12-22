import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/users/user";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit() {
  }

}
