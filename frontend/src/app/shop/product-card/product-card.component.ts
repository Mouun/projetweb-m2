import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ButtonSize } from '../../shared/directives/base-button.directive';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  public buttonSize = ButtonSize;

  @Input() public product: Product;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  goToPayment(): void {
  }

  getProductPageLink(): string {
    return `shop/products/${this.product.id}`;
  }
}
