import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {City} from "../../interfaces/cities/city";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CitiesService} from "../../services/cities/cities.service";
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/users/user";
import {AuthService} from "../../services/auth/auth.service";
import {Store} from "@ngrx/store";
import {State} from "../../pages/login/user.state";
import {CreateUser, DeleteUser, GetUpdateUser} from "../../pages/login/user.actions";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy, DoCheck {

  @Input() user: User;
  @Input() cities: City[];
  @Input() currentUserCityId: City;

  form: FormGroup;
  private error: string;
  private subs: Subscription[] = [];

  constructor(
    private citiesService: CitiesService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private store: Store<State>
  ) {
  }

  ngOnInit() {
    this.createInitialForm();
    if (this.user) {
      this.prefillFormForEdit()
    } else {
      this.addValidatorsForSignUpForm();
    }
  }

  ngDoCheck() {
  }

  submit() {
    if (this.user) {
      this.updateUserData();
    } else {
      this.createNewUser();
    }
  }

  removeAccount() {
    const isConfirmed = confirm('Are you sure? Do you want to deleteUser your account?');

    if (isConfirmed) {
      this.store.dispatch(new DeleteUser(this.user._id));
    }
  };

  updateUserData() {
    const userDataToUpdate = this.form.value;
    for (let key in userDataToUpdate) {
      if (!userDataToUpdate[key]) {
        delete userDataToUpdate[key]
      }
    }
    this.store.dispatch(new GetUpdateUser({id: this.user._id, dataToUpdate: userDataToUpdate}))
  }

  createNewUser() {
    this.store.dispatch(new CreateUser(this.form.value));
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
    });

    //must be re-written!!! todo

    setTimeout(() => this.form.patchValue({
      city: this.currentUserCityId
    }), 100);

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

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }

  ngOnDestroy(): void {
    this.subs.forEach(el => el.unsubscribe());
  }
}
