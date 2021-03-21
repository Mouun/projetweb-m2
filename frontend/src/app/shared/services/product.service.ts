import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductFilter } from '../../shop/all-products/models/ProductFilter';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductResponse } from '../models/ProductResponse';
import { ProductByIdResponse } from '../models/ProductByIdResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  public getWithFilter = (query: ProductFilter): Observable<ProductResponse<Product[]>> => {
    return this.http.post<ProductResponse<Product[]>>('GetAllProducts', query);
  }

  public getOne = (productId: string): Observable<ProductByIdResponse<Product>> => {
    return this.http.get<ProductByIdResponse<Product>>(`GetProductById?id=${productId}`);
  }
}

@Injectable()
export class ProductsResolver implements Resolve<any[]> {

  constructor(
    private productService: ProductService
  ) {}

  resolve(): Observable<any[]> {
    const productResponse = this.productService.getWithFilter({} as ProductFilter);

    return forkJoin([productResponse]);
  }
}

@Injectable()
export class ProductResolver implements Resolve<any[]> {

  constructor(
    private productService: ProductService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const productId = route.params.productId;
    const productResponse = this.productService.getOne(productId);

    return forkJoin([productResponse]);
  }
}
