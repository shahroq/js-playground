import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { Brand } from '@shared/components/brand/brand';

@Component({
  selector: 'app-card-centered',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatButtonModule, Brand],
  templateUrl: './card-centered.html',
  styleUrl: './card-centered.scss',
})
export class CardCentered {
  title = input.required<string>();
  subtitle = input<string>('');
  icon = input<string>('');
}
