import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../models/products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails {
  product: Product | undefined;
  selectedImage = '';

  constructor(private route: ActivatedRoute) {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);

    this.product = PRODUCTS.find(p => p.id === id);
    if (this.product) {
      this.selectedImage = this.product.image;
    }
  }

  setImage(img: string): void {
    this.selectedImage = img;
  }
}
