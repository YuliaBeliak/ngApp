import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/user-detail/user-detail.component";
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailContainer } from "./pages/user-detail/user-detail.container";


const routes: Routes = [
  {path: 'users', component: UsersContainer},
  {path: 'detail/:id', component: UserDetailContainer},
  {path: '', redirectTo: 'users', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

