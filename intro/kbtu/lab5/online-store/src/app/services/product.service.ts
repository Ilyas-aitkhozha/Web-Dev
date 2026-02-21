import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../models/products';
import { Category } from '../models/category.model';
import { CATEGORIES } from '../models/categories';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getCategories(): Category[] {
    return CATEGORIES;
  }

  getProducts(): Product[] {
    return PRODUCTS;
  }
}
