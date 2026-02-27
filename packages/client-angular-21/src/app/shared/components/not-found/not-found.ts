import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CardCentered } from '../card-centered/card-centered';

@Component({
  selector: 'app-not-found',
  imports: [MatIconModule, MatButtonModule, CardCentered],
  templateUrl: './not-found.html',
})
export class NotFound {}
