import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getIsAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  getIsAuthenticated(): boolean {
    return this.authService.getIsAuthenticated();
  }
}
