import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { Products } from './products/products';
import { Add } from './products/add/add';
import { Update } from './products/update/update';
import { Delete } from './products/delete/delete';

const routes: Routes = [
  // Use empty string for the default landing page
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: Products,
        children: [
          { path: 'add', component: Add },
          { path: 'delete', component: Delete },
          { path: 'update', component: Update },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouteModule {}
