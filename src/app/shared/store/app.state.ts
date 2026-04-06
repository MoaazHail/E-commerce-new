import { authReducer } from '../../core/auth/store/auth.reducers';

export interface AppState {
  auth: { login: any; register: any; forgotPassword: any };
  public: {
    cart: any;
    about: any;
    category: any;
    contact: any;
    home: any;
    notFound: any;
    productDetails: any;
  };
  private: { dashboard: any; orders: any; product: any };
}

export const appReducer = {
  auth: authReducer,
};
