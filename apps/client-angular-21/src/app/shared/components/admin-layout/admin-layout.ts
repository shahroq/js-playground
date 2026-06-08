import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Brand } from '@shared/components/brand/brand';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Brand],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}
