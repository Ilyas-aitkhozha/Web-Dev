import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../models/products';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredProducts = this.products;
  }

  filterProducts(): void {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) {
      this.filteredProducts = this.products;
      return;
    }
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }
}
