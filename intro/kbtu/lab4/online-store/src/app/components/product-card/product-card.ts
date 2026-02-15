import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard implements OnChanges {
  @Input() product!: Product;

  selectedImage = '';
  imgOk = true;

  ngOnChanges(): void {
    if (this.product) {
      this.selectedImage = this.product.image;
      this.imgOk = true;
    }
  }

  setImage(img: string): void {
    this.selectedImage = img;
    this.imgOk = true;
  }

  onImgError(): void {
    this.imgOk = false;
  }

  whatsappShareLink(): string {
    const text = `Check out this product: ${this.product.link}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  telegramShareLink(): string {
    const url = encodeURIComponent(this.product.link);
    const text = encodeURIComponent(this.product.name);
    return `https://t.me/share/url?url=${url}&text=${text}`;
  }
}
