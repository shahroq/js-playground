import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { CardCentered } from '@shared/components/card-centered/card-centered';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-sign-in-form',
  imports: [RouterLink, ReactiveFormsModule, JsonPipe, MatButtonModule, CardCentered, Input],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.scss',
})
export class SignInForm {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    title: new FormControl('Shm', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  inputInvalid(name: string) {
    return (
      this.form.get(name)?.touched && this.form.get(name)?.dirty && this.form.get(name)?.invalid
    );
  }

  /*
  get emailIsInvalid() {
    return (
      this.form.get('email')?.touched &&
      this.form.get('email')?.dirty &&
      this.form.get('email')?.invalid
    );
  }
  */

  signIn() {
    console.log(this.form);
  }
}
