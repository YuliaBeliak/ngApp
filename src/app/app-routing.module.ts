import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailContainer } from "./pages/user-detail/user-detail.container";
import {LoginComponent} from "./pages/login/login.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersContainer},
  {path: 'detail/:id', component: UserDetailContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

