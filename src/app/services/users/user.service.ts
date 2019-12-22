import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {User} from "../../interfaces/users/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/${id}`);
  }

  public login(data: object): Observable<object> {
    return this.http.post<object>(`${this.usersUrl}/login`, data)
  }
}
