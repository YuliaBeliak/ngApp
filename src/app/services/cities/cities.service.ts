import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../interfaces/cities/city";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private citiesUrl = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl);
  }

  getCityIdByTitle(cityTitle: string): Observable<string> {
    return this.getCities().pipe(
      map(cities => cities.find(city => city.title === cityTitle)._id)
    )
  }

  getCityTitleById(cityId: string): Observable<string> {
    return this.getCities().pipe(
      map(cities => cities.find(city => city._id === cityId).title)
    )
  }


}
