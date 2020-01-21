import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/users/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {State} from "./user.state";
import {GetLoginInfo} from "./user.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  error: string;
  private subs: Subscription[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  submit() {
    this.store.dispatch(new GetLoginInfo(this.form.value))

    // this.subs.push(
    //   this.authService.login(this.form.value)
    //     .subscribe(
    //       (res) => {
    //         this.authService.saveToken(res.tokens.access, 'access');
    //         this.authService.saveToken(res.tokens.refresh, 'refresh');
    //         this.router.navigate(['me']);
    //       },
    //       (err: HttpErrorResponse) => {
    //         this.showError(err.error.error || err.statusText)
    //       })
    // );
  }

  showError(err: string) {
    this.error = err;
    setTimeout(() => this.error = null, 3000);
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }
}
