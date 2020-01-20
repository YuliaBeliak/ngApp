import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersContainer } from "./pages/users/users.container";
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailContainer } from "./components/user-detail/user-detail.container";
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './pages/signup/signup.component';
import { MeComponent } from './pages/me/me.component';
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { EditComponent } from './pages/edit/edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

import { materialModules} from "./shared/material/material.imports";
import {UserFormContainer} from "./components/user-form/user-form.container";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./pages/login/auth.reducer";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const INTERCEPTOR_PROVIDERS: Provider[] = [{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}];

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
    UserFormComponent,
    UserFormContainer,
    NotFoundComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    materialModules,
    StoreModule.forRoot({'auth': authReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
