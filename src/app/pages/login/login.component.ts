import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/users/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  submit() {
    this.authService.login(this.form.value).subscribe(() => {
      // this.authService.isLogged = true;
      this.router.navigate(['me']);
      this.form.reset();
    });
  }
}
