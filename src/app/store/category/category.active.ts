import { createAction, props } from '@ngrx/store';

export const loadCategory = createAction('[category] load products');

export const successCategory = createAction('[category] success category ');

export const failedCategory = createAction('[category] failed category');
