import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { Brand } from '../../../shared/components/brand/brand';

@Component({
  selector: 'app-sign-in-form',
  imports: [MatCardModule, MatDividerModule, Brand],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.scss',
})
export class SignInForm {}
