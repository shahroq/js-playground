import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [JsonPipe],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  control = input<AbstractControl>();
}
