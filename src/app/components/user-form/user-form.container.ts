import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CitiesService} from "../../services/cities/cities.service";
import {City} from "../../interfaces/cities/city";
import {User} from "../../interfaces/users/user";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-user-form-container',
  template: `
    <app-user-form [cities]="cities | async" 
                   [user]="user"
                   [currentUserCityId]="currentUserCityId | async">
    </app-user-form>
  `
})
export class UserFormContainer implements OnInit {

  @Input() user: User;
  cities: Observable<City[]>;
  currentUserCityId: Observable<string>;

  constructor(
    private citiesService: CitiesService
  ) {
  }

  ngOnInit() {
    this.cities = this.citiesService.getCities();
    if (this.user) {
      this.currentUserCityId = this.setCurrentUserCity();
    }
  }

  setCurrentUserCity() {
    return this.cities.pipe(
      map(cities => cities.find(city => city.title === this.user.city[0])._id)
    )
  }

}
