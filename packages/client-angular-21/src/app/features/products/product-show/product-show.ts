import { Component, computed, input, signal } from '@angular/core';
import data from '@data/data-source.json';
import { Product } from '../product.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-show',
  imports: [JsonPipe],
  templateUrl: './product-show.html',
  styleUrl: './product-show.scss',
})
export class ProductShow {
  protected products = <Product[]>data.products;

  x1: number = 0;
  x2 = signal(0);

  id = input.required<number>();

  product = computed(() => this.products.find((p) => p.id == this.id()));

  get product0(): Product | undefined {
    return this.products.find((p) => p.id == this.id());
  }

  onClick() {
    console.log('clicked...');
    const rand = Math.random();

    this.x1 = rand;
    this.x2.set(rand);
  }
}
