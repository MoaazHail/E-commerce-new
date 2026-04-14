import { OrdersInfo, StatusStore } from '../types/dashboard';

export const STATUS_STORE: StatusStore[] = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: 'dollar-sign',
  },
  {
    title: 'Orders',
    value: '2,345',
    change: '+15.3%',
    trend: 'up',
    icon: 'shopping-cart',
  },
  {
    title: 'Customers',
    value: '1,234',
    change: '+12.5%',
    trend: 'up',
    icon: 'users',
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    icon: 'trending-up',
  },
];
export const ORDERS_INFO: OrdersInfo[] = [
  {
    id: 122,
    username: 'Olivia Martin',
    total: 129.99,
    isCompleted: true,
    products: [],
  },
  {
    id: 234562,
    username: 'Isabella Nguyen',
    total: 49.99,
    isCompleted: true,
    products: [],
  },
  {
    id: 234122,
    username: 'William Kim',
    total: 159.99,
    isCompleted: true,
    products: [],
  },
  {
    id: 1782,
    username: 'Jackson Lee',
    total: 299.99,
    isCompleted: false,
    products: [],
  },
  {
    id: 34122,
    username: 'Sofia Davis',
    total: 79.99,
    isCompleted: true,
    products: [],
  },
];
