import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {City} from "../../interfaces/cities/city";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CitiesService} from "../../services/cities/cities.service";
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/users/user";
import {map} from "rxjs/operators";
import {AuthService} from "../../services/auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user: User;

  cities: Observable<City[]>;
  form: FormGroup;
  private error: string;
  private subs: Subscription[] = [];

  constructor(
    private citiesService: CitiesService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.cities = this.getCities();
    this.createInitialForm();
    if (this.user) {
      this.setUserCity();
      this.prefillFormForEdit();
    } else {
      this.addValidatorsForSignUpForm();
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
    this.subs.push(
      this.cities.pipe(
        map(cities => {
          let userCity = cities.filter(el => el.title === this.user.city[0]);
          this.form.patchValue({
            city: userCity[0]._id
          });
        }),
      ).subscribe()
    );
  }

  removeAccount() {
    const isConfirmed = confirm('Are you sure? Do you want to remove your account?');

    if (isConfirmed) {
      this.subs.push(
        this.userService.remove(this.user._id)
          .subscribe(() => {
            this.authService.logout();
          })
      );
    }
  };

  updateUserData() {
    const userDataToUpdate = this.form.value;
    for (let key in userDataToUpdate) {
      if (!userDataToUpdate[key]) {
        delete userDataToUpdate[key]
      }
    }
    this.subs.push(
      this.userService.updateUser(this.user._id, userDataToUpdate)
        .subscribe((res: User) => {
          this.loggedUser = res;
          this.router.navigate(['/me'])
        })
    );
  }

  createNewUser() {
    this.subs.push(
      this.userService.signUp(this.form.value)
        .subscribe(
          () => {
            this.router.navigate(['/me'])
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.showError(err.error.error)
          }
        )
    );
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

  addValidatorsForSignUpForm() {
    this.form.controls["firstName"].setValidators([
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[a-z]+$/i)
    ]);
    this.form.controls["lastName"].setValidators([
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(/^[a-z]+$/i)
    ]);
    this.form.controls["login"].setValidators([
      Validators.minLength(8),
      Validators.maxLength(30)
    ]);
    this.form.controls["password"].setValidators([
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-z, 0-9-_!/?&*#]+$/)
    ]);

  }

  showError(err: string) {
    this.error = err;
    setTimeout(() => this.error = null, 3000);
  }

  set loggedUser(user: User) {
    this.authService.loggedUser = user;
  }

  getCities(): Observable<City[]> {
    return this.citiesService.getCities();
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }
}
