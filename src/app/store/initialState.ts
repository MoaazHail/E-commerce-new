import { UserCart } from '../lib/types/cart';
import { Categories } from '../lib/types/category';
import { AuthState } from './auth/auth.state';
import { ProductState } from './product/product.state';

interface InitialState {
  auth: AuthState;
  products: ProductState;
  categories: Categories;
  cart: UserCart;
}
