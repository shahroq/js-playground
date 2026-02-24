import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-dummy',
  imports: [],
  templateUrl: './dummy.html',
  styleUrl: './dummy.scss',
})
export class Dummy {
  // @Input() width: string = '100%';
  // @Input() height: string = '250px';

  // Optional: use signal inputs (cleaner defaults & type inference)
  width = input<string>('100%'); // default: 100%
  height = input<string>('250px');
}
