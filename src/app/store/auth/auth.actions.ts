import { createAction, props } from '@ngrx/store';

export const login = createAction('[auth] login', props<LoginForm>());

export const loginSuccess = createAction('[auth] login load success');

export const loginFailed = createAction('[auth] login load success');

export const register = createAction('[auth] register', props<RegisterForm>());

export const registerSuccess = createAction('[auth] register load success');

export const registerFailed = createAction('[auth] register load success');
