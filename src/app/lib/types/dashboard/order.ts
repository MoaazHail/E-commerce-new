import { ShippingAddress } from '../order';

export interface DashboardOrder {
  cartItems: DashboardItem[];
  createdAt: string;
  isDelivered: false;
  isPaid: false;
  paymentMethodType: 'cash' | 'card';
  shippingAddress?: ShippingAddress;
  totalOrderPrice: number;
  updatedAt: string;
  user: {
    email: string;
    nameDetails: {
      firstName: string;
      lastName: string;
    };
    _id: string;
  };
  _id: string;
}

export interface DashboardItem {
  price: number;
  product: {
    name: string;
    price: number;
    _id: string;
  };
  quantity: number;
  _id: string;
}
