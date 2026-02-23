import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  categories: Category[] = [];
  products: Product[] = [];
  favorites: Product[] = [];

  selectedCategoryId: number | null = null;

  constructor(private productService: ProductService) {
    this.categories = this.productService.getCategories();
    this.products = this.productService.getProducts();
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategoryId === null) return [];

    const result: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].categoryId === this.selectedCategoryId) {
        result.push(this.products[i]);
      }
    }
    return result;
  }

  handleDelete(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
  }
  toggleFavorite(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    product.isFavorite = !product.isFavorite;

    this.favorites = this.products.filter(p => p.isFavorite);
  }
}
