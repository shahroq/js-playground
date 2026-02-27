import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, MatCardModule, MatDividerModule],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss',
})
export class BlankLayout {}
