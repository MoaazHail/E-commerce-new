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
  createdAt: string;
  deletedAt: null;
  items: [
    {
      price: number;
      product: Product;
      quantity: number;
      _id: string;
    },
  ];
  totalPrice: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export interface GustCart {
  product: Product;
  quantity: number;
  length: number;
}
