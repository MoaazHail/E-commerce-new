export interface User {
  age: number;
  createdAt: string;
  deletedAt: null;
  email: string;
  gender?: 'male' | 'female';
  nameDetails: { firstName: string; maidenName: string; lastName: string };
  password: string;
  role?: 'user' | 'admin';
  updatedAt: string;
  __v: number;
  _id: string;
}
