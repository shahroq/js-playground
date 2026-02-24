import { Component, inject, OnInit, signal } from '@angular/core';
import { ImageFetcher } from './image-fetcher.service';
import { JsonPipe } from '@angular/common';
import { filter, map, take } from 'rxjs';
import { ImageCatApi } from './types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-random-image',
  imports: [JsonPipe, MatCardModule, MatButtonModule],
  templateUrl: './random-image.html',
  styleUrl: './random-image.scss',
})
export class RandomImage implements OnInit {
  private imageFetcher = inject(ImageFetcher);

  photo = signal<ImageCatApi | null>(null);

  // REVIEW: constructor or ngInit?
  constructor() {
    // this.getRandomImage();
  }

  ngOnInit() {
    this.getRandomImage();
  }

  getRandomImage() {
    // REVIEW: use toSignal?
    this.imageFetcher
      .get()
      .pipe(
        filter((images) => images?.length > 0),
        map((images) => images[0]),
        take(1), // optional but good practice
      )
      .subscribe((image) => {
        this.photo.set(image);
      });
  }
}
