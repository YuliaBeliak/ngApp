import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../interfaces/cities/city";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private citiesUrl = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl);
  }

  getCity(id: string): Observable<City> {
    return  this.http.get<City>(`${this.citiesUrl}/${id}`);
  }
}
