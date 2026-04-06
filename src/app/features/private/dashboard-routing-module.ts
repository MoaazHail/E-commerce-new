import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';
import { Orders } from './orders/orders';
import { adminGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  // Use empty string for the default landing page
  {
    path: '',
    component: DashboardLayout,
    // canActivate: [adminGuard], // The API Not Has A Rule !!!
    children: [
      { path: '', component: Dashboard, pathMatch: 'full' },
      { path: 'products', component: Products, pathMatch: 'full' },
      { path: 'orders', component: Orders, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouteModule {}
