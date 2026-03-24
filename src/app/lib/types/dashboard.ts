import { Product } from './product';

export declare type StatusStore = {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
};

export declare type OrdersInfo = {
  id: number;
  username: string;
  total: number;
  isCompleted: boolean;
  products: Product[];
};
