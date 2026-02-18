import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-password-generator',
  imports: [CommonModule, NgIf],
  templateUrl: './password-generator.html',
  styles: `
    section {
      border: 1px solid blue;
      padding: 10px;
    }
  `,
})
export class PasswordGenerator {
  len = 0;
  useSym = false;

  password = '';

  onButtonCLick() {
    console.log(`
      len: ${this.len}\n
      useSym: ${this.useSym}\n
    `);

    this.password = 'My Password';
  }

  onChangeLen(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.len = parsedValue;
    }
  }

  onChangeUseSym() {
    this.useSym = !this.useSym;
  }
}
