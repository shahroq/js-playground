import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import data from './../../data/data-source.json';
import { Container } from './components/material-sandbox/container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Container],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('client-angular-21');

  protected data = data;
}
