import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { filter, map, take } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CatApiResponse } from './types';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photo-show',
  imports: [JsonPipe, MatCardModule, MatButtonModule],
  templateUrl: './photo-show.html',
  styleUrl: './photo-show.scss',
})
export class PhotoShow {
  private photoService = inject(PhotoService);

  photo = signal<CatApiResponse | null>(null);

  constructor() {
    this.fetchPhoto();
  }

  // REVIEW: constructor or ngInit?
  ngOnInit() {
    // this.fetchPhoto();
  }

  fetchPhoto() {
    // REVIEW: use toSignal?
    this.photoService
      .getPhoto()
      .pipe(
        filter((response) => response?.length > 0),
        map((response) => response[0]),
        take(1), // optional but good practice
      )
      .subscribe((photo) => {
        this.photo.set(photo);
      });
  }
}
