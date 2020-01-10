import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailContainer } from "./components/user-detail/user-detail.container";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {MeComponent} from "./pages/me/me.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {EditComponent} from "./pages/edit/edit.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'me', component: MeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: UsersContainer, canActivate: [AuthGuard]},
  {path: 'detail/:id', component: UserDetailContainer},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

