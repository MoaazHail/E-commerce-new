import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cart } from './features/public/cart/cart';
import { Home } from './features/public/home/home';
import { userGuard } from './core/guards/auth.guard';
import { ProductDetails } from './features/public/product-details/product-details';
import { AuthLayout } from './shared/layout/auth-layout/auth-layout';
import { Category } from './features/public/category/category';
import { NotFound } from './features/public/not-found/not-found';
import { Contact } from './features/public/contact/contact';
import { MainLayout } from './shared/layout/main-layout/main-layout';
import { About } from './features/public/about/about';

const routes: Routes = [
  // Use empty string for the default landing page
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'cart', component: Cart, pathMatch: 'full' },
      { path: 'products/:id', component: ProductDetails, pathMatch: 'full' },
      { path: 'category/:slog', component: Category, pathMatch: 'full' },
      { path: 'contact', component: Contact, pathMatch: 'full' },
      { path: 'about', component: About, pathMatch: 'full' },
    ],
  },

  // Auth
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth-routing-module').then((m) => m.AuthRouteModule),
  },

  // Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/private/dashboard-routing-module').then((m) => m.DashboardRouteModule),
  },

  // Optional: Redirect any unknown paths back to home
  // or a NotFound component
  { path: '**', component: NotFound },
];

@NgModule({
  // useHash: false is standard for modern web apps
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
