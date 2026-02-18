import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';
import data from './../../data/data-source.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Card],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client-angular-21');

  protected data = data;
}
