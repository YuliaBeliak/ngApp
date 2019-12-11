import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<object> {
    return this.http.get(this.usersUrl);
  }

  public getUser(id: string): Observable<object> {
    return this.http.get(this.usersUrl + '/' + id);
  }
}
