import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './core/auth/login/login';
import { Register } from './core/auth/register/register';
import { Cart } from './features/cart/cart';
import { Home } from './features/home/home';

const routes: Routes = [
  // Use empty string for the default landing page
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'cart', component: Cart },

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
