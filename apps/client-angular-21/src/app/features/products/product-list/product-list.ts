import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import data from '@data/data-source.json';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  protected products = <Product[]>data.products;
}
