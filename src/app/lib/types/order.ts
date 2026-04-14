export interface MyOrder {
  _id: string;
  user: {
    _id: string;
    nameDetails: {
      firstName: string;
      maidenName: string;
      lastName: string;
    };
    email: 'moaaz@example.com';
  };
  cartItems: Item[];
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  shippingAddress?: ShippingAddress;
  paymentMethodType: 'cash' | 'card';
  totalOrderPrice: 6.48;
  updatedAt: string;
}
export interface ShippingAddress {
  city: string;
  details: string;
  phone: string;
  postalCode: string;
}
export interface Item {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  price: number;
  _id: string;
}
