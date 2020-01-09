import {Component, Input, OnInit, ɵLContext} from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../interfaces/cities/city";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CitiesService} from "../../services/cities/cities.service";
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/users/user";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() user: User;

  cities: Observable<City[]>;
  form: FormGroup;

  constructor(
    private citiesService: CitiesService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cities = this.citiesService.getCities();
    this.createInitialForm();
    if(this.user) {
      this.setUserCity();
      this.prefillFormForEdit();
    } else {
      this.form.setValidators(Validators.required)
    }
  }

  submit() {
    if (this.user) {
      this.updateUserData();
    } else {
      this.createNewUser();
    }
  }

  setUserCity() {
    this.cities.pipe(
      map(cities => {
        let userCity = cities.filter(el => el.title === this.user.city[0]);
        this.form.patchValue({
          city: userCity[0]._id
        });
      }),
    ).subscribe()
  }

  removeAccount() {
    const isConfirmed = confirm('Are you sure? Do you want to remove your account?');

    if (isConfirmed) {
      this.userService.remove(this.user._id)
        .subscribe(() => {
          this.authService.logout();
        })
    }
  };

  updateUserData() {
    const userDataToUpdate = this.form.value;
    for (let key in userDataToUpdate) {
      if (!userDataToUpdate[key]) {
        delete userDataToUpdate[key]
      }
    }
    this.userService.updateUser(this.user._id, userDataToUpdate)
      .subscribe((res: User) => {
        this.authService.loggedUser = res;
        this.router.navigate(['/me'])
      });
  }

  createNewUser() {
    this.userService.signUp(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/me'])
      });
  }

  createInitialForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      login: new FormControl(null),
      password: new FormControl(null),
      city: new FormControl(null)
    });
  }

  prefillFormForEdit() {
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      login: this.user.login
    })
  }
}
