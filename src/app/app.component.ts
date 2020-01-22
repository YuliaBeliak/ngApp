import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "./pages/login/user.state";
import {LogOut} from "./pages/login/user.actions";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<State>
  ) {}

    ngOnInit(): void {
    }

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  logout(): void {
    this.store.dispatch(new LogOut());
  }
}
