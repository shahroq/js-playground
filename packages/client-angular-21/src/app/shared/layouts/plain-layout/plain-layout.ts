import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-plain-layout',
  imports: [MatCardModule, MatDividerModule, RouterOutlet],
  templateUrl: './plain-layout.html',
  styleUrl: './plain-layout.scss',
})
export class PlainLayout {}
