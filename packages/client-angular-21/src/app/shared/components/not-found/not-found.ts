import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CardCentered } from '@shared/components/card-centered/card-centered';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatIconModule, MatButtonModule, CardCentered],
  templateUrl: './not-found.html',
})
export class NotFound {}
