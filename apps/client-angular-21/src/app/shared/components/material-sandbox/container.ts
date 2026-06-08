import { Component } from '@angular/core';
import { Card } from './card';
import { Button } from './button';

@Component({
  selector: 'app-container',
  imports: [Card, Button],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class Container {}
