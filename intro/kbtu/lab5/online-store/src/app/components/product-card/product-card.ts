import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  product = input.required<Product>();
  delete = output<number>();
  toggleFavorite = output<number>();
  selectedImage = '';
  imgOk = true;

  get mainImage(): string {
    const p = this.product();
    return this.selectedImage || p.image;
  }

  setImage(img: string): void {
    this.selectedImage = img;
    this.imgOk = true;
  }

  onImgError(): void {
    this.imgOk = false;
  }

  like(): void {
    this.product().likes += 1;
  }

  remove(): void {
    this.delete.emit(this.product().id);
  }

  whatsappShareLink(): string {
    const text = `Check out this product: ${this.product().link}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }
  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.product().id);
  }

  telegramShareLink(): string {
    const url = encodeURIComponent(this.product().link);
    const text = encodeURIComponent(this.product().name);
    return `https://t.me/share/url?url=${url}&text=${text}`;
  }
}
