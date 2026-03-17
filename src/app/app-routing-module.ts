import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';
import { Cart } from './features/public/cart/cart';
import { Home } from './features/public/home/home';
import { userGuard } from './core/auth/guard-guard';
import { ProductDetails } from './features/public/product-details/product-details';

import { Navbar } from './shared/layout/navbar/navbar';

const routes: Routes = [
  // Use empty string for the default landing page
  {
    path: '',
    component: Navbar,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'login', component: Login, canActivate: [userGuard], pathMatch: 'full' },
      { path: 'register', component: Register, canActivate: [userGuard], pathMatch: 'full' },
      { path: 'cart', component: Cart, pathMatch: 'full' },
      { path: 'products/:id', component: ProductDetails, pathMatch: 'full' },
    ],
  },

  // Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },

  // Optional: Redirect any unknown paths back to home
  // or a NotFound component
  { path: '**', redirectTo: '' },
];

@NgModule({
  // useHash: false is standard for modern web apps
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
