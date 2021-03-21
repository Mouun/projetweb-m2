import { Product } from './Product';

export interface ProductByIdResponse<T>  {
  data: T;
  otherProducts: Product[];
}
