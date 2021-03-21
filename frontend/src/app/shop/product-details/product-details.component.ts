import { Component, OnInit } from '@angular/core';
import { ButtonSize } from '../../shared/directives/base-button.directive';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public buttonSize = ButtonSize;

  public product: Product;
  public otherProducts: Product[];

  public swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: true,
    navigation: true
  };

  constructor(
    public router: Router,
    public location: Location,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.product = data.productResolverResult[0].data;
        this.otherProducts = data.productResolverResult[0].otherProducts;
      });
  }

  goToPayment(): void {
  }
}
