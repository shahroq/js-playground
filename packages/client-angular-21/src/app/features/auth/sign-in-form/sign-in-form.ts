import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CardCentered } from '@shared/components/card-centered/card-centered';

@Component({
  selector: 'app-sign-in-form',
  imports: [MatButtonModule, CardCentered],
  templateUrl: './sign-in-form.html',
})
export class SignInForm {}
