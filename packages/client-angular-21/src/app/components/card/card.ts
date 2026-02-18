import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styles: `
    .card {
      border: 1px solid black;

      .title {
        text-decoration: underline;
      }
    }
  `,
})
export class Card {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() description: string = '';

  /*
  @Input() product: {
    id: number;
    name: string;
    description: string;
  } = {
    id: 0,
    name: '.',
    description: '...',
  };
  */
}
