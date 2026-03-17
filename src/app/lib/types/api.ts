export interface ResponseApi<T> {
  limit: number;
  products: T;
  skip: number;
  total: number;
}
