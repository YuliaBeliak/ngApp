import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../interfaces/users/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}/${id}`);
  }

  signUp(formValue: User): Observable<User[]> {
    return this.http.post<User[]>(this.usersUrl, formValue);
  }

  updateUser(id: string, formValue: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${id}`, formValue);
  }

  remove(id: string): Observable<User> {
    return this.http.delete<User>(`${this.usersUrl}/${id}`);
  }
}
