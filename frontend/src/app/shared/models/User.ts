import { Order } from './Order';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  postalcode: string;
  city: string;
  orders: Order[];
}
