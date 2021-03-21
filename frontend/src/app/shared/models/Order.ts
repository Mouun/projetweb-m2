import { Product } from './Product';

export interface Order {
  id: string;
  orderPlacedDate: Date;
  isPayed: boolean;
  product: Product;
}
