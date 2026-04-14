import { Product } from '../../lib/types/product';

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}
export const initialProductState: ProductState = { items: [], loading: false, error: null };
