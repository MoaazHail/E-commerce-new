import { createAction, props } from '@ngrx/store';

export const loginAction = createAction('[auth] login', props<LoginForm>());

export const registerAction = createAction('[auth] register', props<RegisterForm>());

export const forgotPasswordAction = createAction(
  '[auth] forgot password',
  props<ForgotPasswordForm>(),
);
