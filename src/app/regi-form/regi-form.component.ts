import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { RegistrationValidator } from '../shared/register.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-regi-form',
  templateUrl: './regi-form.component.html',
  styleUrls: ['./regi-form.component.css']
})
export class RegiFormComponent implements OnInit {
  regiForm: FormGroup;
  passwordFormGroup: FormGroup;
  _id = '';
  password = '';
  submitted = false;
  firstName = '';
  lastName = '';
  email = '';

  constructor(
    private fBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.passwordFormGroup = this.fBuilder.group(
      {
        password: ['', Validators.required],
        repeatPassword: ['', Validators.required]
      },
      {
        validator: RegistrationValidator.validate.bind(this)
      }
    );
    this.regiForm = this.fBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: this.passwordFormGroup,
      passwordFormGroup: this.passwordFormGroup
    });
  }

  ngOnInit() {}
  // convenience getter for easy access to form fields
  // get f() {
  //   return this.regiForm.controls;
  // }

  onSubmit() {
    if (this.regiForm.invalid) {
      return;
    }
    const newUser = {
      _id: this._id,
      firstName: this.regiForm.value.firstName,
      lastName: this.regiForm.value.lastName,
      email: this.regiForm.value.email,
      password: this.regiForm.value.password.password
    };
    this.submitted = true;
    this.userService.addUser(newUser).subscribe((res) => {
      this.router.navigate(['/']);
      console.log(res);
    });

    // console.log(newUser);
  }
}
