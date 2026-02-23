import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList {
  products = input.required<Product[]>();
  toggleFavorite = output<number>();
  deleteProduct = output<number>();

  onDelete(id: number) {
    this.deleteProduct.emit(id);
  }
  onToggleFavorite(id: number) {
    this.toggleFavorite.emit(id);
  }
}
