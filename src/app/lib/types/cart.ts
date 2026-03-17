import { Product } from './product';

export interface ProductCart {
  discountPercentage: number;
  discountedTotal: number;
  id: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: 'Charger SXT RWD';
  total: number;
}
export interface UserCart {
  discountedTotal: number;
  id: number;
  products: ProductCart[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  userId: number;
}

export interface GustCart {
  product: Product;
  quantity: number;
  length: number;
}
