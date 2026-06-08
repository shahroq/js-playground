import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CardCentered } from '@shared/components/card-centered/card-centered';

@Component({
  selector: 'app-sign-up-form',
  imports: [RouterLink, MatButtonModule, CardCentered],
  templateUrl: './sign-up-form.html',
})
export class SignUpForm {}
