import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

    ngOnInit(): void {
    }

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  logout(): void {
    this
    this.authService.logout();
  }
}
