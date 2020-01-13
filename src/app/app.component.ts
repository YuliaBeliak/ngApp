import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService) {}

  getIsAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
