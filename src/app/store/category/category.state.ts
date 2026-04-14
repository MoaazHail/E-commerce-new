import { Category } from '../../features/public/category/category';

export interface CategoryState {
  items: Category[];
  loading: boolean;
  error: string | null;
}
export const initialProductState: CategoryState = { items: [], loading: false, error: null };
