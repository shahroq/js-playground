import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-material-sandbox',
  imports: [MatSlideToggleModule],
  templateUrl: './material-sandbox.html',
  styleUrl: './material-sandbox.scss',
})
export class MaterialSandbox {}
