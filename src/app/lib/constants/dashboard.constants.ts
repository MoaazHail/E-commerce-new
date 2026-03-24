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
    products: [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ['beauty', 'mascara'],
        brand: 'Essence',
        sku: 'BEA-ESS-ESS-001',
        weight: 4,
        dimensions: {
          width: 15.14,
          height: 13.08,
          depth: 22.99,
        },
        warrantyInformation: '1 week warranty',
        shippingInformation: 'Ships in 3-5 business days',
        availabilityStatus: 'In Stock',
        reviews: [
          {
            rating: 3,
            comment: 'Would not recommend!',
            date: '2025-04-30T09:41:02.053Z',
            reviewerName: 'Eleanor Collins',
            reviewerEmail: 'eleanor.collins@x.dummyjson.com',
          },
        ],
        returnPolicy: 'No return policy',
        minimumOrderQuantity: 48,
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      },
    ],
  },
  {
    id: 234562,
    username: 'Isabella Nguyen',
    total: 49.99,
    isCompleted: true,
    products: [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ['beauty', 'mascara'],
        brand: 'Essence',
        sku: 'BEA-ESS-ESS-001',
        weight: 4,
        dimensions: {
          width: 15.14,
          height: 13.08,
          depth: 22.99,
        },
        warrantyInformation: '1 week warranty',
        shippingInformation: 'Ships in 3-5 business days',
        availabilityStatus: 'In Stock',
        reviews: [
          {
            rating: 3,
            comment: 'Would not recommend!',
            date: '2025-04-30T09:41:02.053Z',
            reviewerName: 'Eleanor Collins',
            reviewerEmail: 'eleanor.collins@x.dummyjson.com',
          },
        ],
        returnPolicy: 'No return policy',
        minimumOrderQuantity: 48,
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      },
    ],
  },
  {
    id: 234122,
    username: 'William Kim',
    total: 159.99,
    isCompleted: true,
    products: [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ['beauty', 'mascara'],
        brand: 'Essence',
        sku: 'BEA-ESS-ESS-001',
        weight: 4,
        dimensions: {
          width: 15.14,
          height: 13.08,
          depth: 22.99,
        },
        warrantyInformation: '1 week warranty',
        shippingInformation: 'Ships in 3-5 business days',
        availabilityStatus: 'In Stock',
        reviews: [
          {
            rating: 3,
            comment: 'Would not recommend!',
            date: '2025-04-30T09:41:02.053Z',
            reviewerName: 'Eleanor Collins',
            reviewerEmail: 'eleanor.collins@x.dummyjson.com',
          },
        ],
        returnPolicy: 'No return policy',
        minimumOrderQuantity: 48,
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      },
    ],
  },
  {
    id: 1782,
    username: 'Jackson Lee',
    total: 299.99,
    isCompleted: false,
    products: [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ['beauty', 'mascara'],
        brand: 'Essence',
        sku: 'BEA-ESS-ESS-001',
        weight: 4,
        dimensions: {
          width: 15.14,
          height: 13.08,
          depth: 22.99,
        },
        warrantyInformation: '1 week warranty',
        shippingInformation: 'Ships in 3-5 business days',
        availabilityStatus: 'In Stock',
        reviews: [
          {
            rating: 3,
            comment: 'Would not recommend!',
            date: '2025-04-30T09:41:02.053Z',
            reviewerName: 'Eleanor Collins',
            reviewerEmail: 'eleanor.collins@x.dummyjson.com',
          },
        ],
        returnPolicy: 'No return policy',
        minimumOrderQuantity: 48,
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      },
    ],
  },
  {
    id: 34122,
    username: 'Sofia Davis',
    total: 79.99,
    isCompleted: true,
    products: [
      {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ['beauty', 'mascara'],
        brand: 'Essence',
        sku: 'BEA-ESS-ESS-001',
        weight: 4,
        dimensions: {
          width: 15.14,
          height: 13.08,
          depth: 22.99,
        },
        warrantyInformation: '1 week warranty',
        shippingInformation: 'Ships in 3-5 business days',
        availabilityStatus: 'In Stock',
        reviews: [
          {
            rating: 3,
            comment: 'Would not recommend!',
            date: '2025-04-30T09:41:02.053Z',
            reviewerName: 'Eleanor Collins',
            reviewerEmail: 'eleanor.collins@x.dummyjson.com',
          },
        ],
        returnPolicy: 'No return policy',
        minimumOrderQuantity: 48,
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      },
    ],
  },
];
