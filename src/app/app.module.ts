import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserDetailContainer } from "./pages/user-detail/user-detail.container";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    UsersContainer,
    UserDetailContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
