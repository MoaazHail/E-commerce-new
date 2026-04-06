import { createReducer, on } from '@ngrx/store';
import { loginAction } from './auth.actions';

interface AuthState {
  login: LoginForm;
  register: RegisterForm;
  forgotPassword: ForgotPasswordForm;
}

const initialAuthState: AuthState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    firstName: '',
    maidenName: '',
    lastName: '',
    gender: undefined,
    username: '',
    email: '',
    password: '',
    age: NaN,
  },
  forgotPassword: {
    email: '',
  },
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginAction, (state) => ({
    ...state,
    login: {
      username: state.login.username,
      password: state.login.password,
    },
  })),
);
