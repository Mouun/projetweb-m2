import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FilterPillComponent } from './all-products/filter-pill/filter-pill.component';
import { FilterCollapsibleComponent } from './all-products/filter-collapsible/filter-collapsible.component';
import { ProductResolver, ProductsResolver } from '../shared/services/product.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: AllProductsComponent,
        resolve: {
          productsResolverResult: ProductsResolver
        }
      },
      {
        path: ':productId',
        component: ProductDetailsComponent,
        resolve: {
          productResolverResult: ProductResolver
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    AllProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    FilterPillComponent,
    FilterCollapsibleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ProductsResolver,
    ProductResolver
  ]
})
export class ShopModule {
}
