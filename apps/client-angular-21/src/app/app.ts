import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import data from '@data/data-source.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Catalog App: Angular 21');

  protected data = data;

  ngOnInit() {
    // console.log(this);
  }
}
