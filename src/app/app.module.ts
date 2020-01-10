import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from "./modules/material/material.module";

import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailContainer } from "./components/user-detail/user-detail.container";
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/signup/signup.component';
import { MeComponent } from './pages/me/me.component';
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import { EditComponent } from './pages/edit/edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    UsersContainer,
    UserDetailContainer,
    LoginComponent,
    SignupComponent,
    MeComponent,
    EditComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
