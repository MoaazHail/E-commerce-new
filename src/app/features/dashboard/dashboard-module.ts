import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from './products/products';
import { Add } from './products/add/add';
import { Update } from './products/update/update';
import { Delete } from './products/delete/delete';
import { DashboardRouteModule } from './dashboard-routing-module';
import { AppRoutingModule } from '../../app-routing-module';
import { Dashboard } from './dashboard';
import { AuthModule } from '../../core/auth/auth-module';

@NgModule({
  declarations: [Dashboard, Products, Add, Update, Delete],
  imports: [CommonModule, DashboardRouteModule, AppRoutingModule, AuthModule],
})
export class DashboardModule {}
