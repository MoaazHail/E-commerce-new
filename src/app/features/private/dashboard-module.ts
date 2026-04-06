import { NgModule } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';
import { Orders } from './orders/orders';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing-module';
import { AuthModule } from '../../core/auth/auth.module';
import {
  ChartPie,
  DollarSign,
  Download,
  Ellipsis,
  LayoutDashboard,
  LucideAngularModule,
  Package,
  Pencil,
  Plus,
  TrendingUp,
} from 'lucide-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OrderPipe } from './dashboard/order.pipe';
import { SharedModule } from '../../shared/shared-module';
import { provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [Dashboard, Products, DashboardLayout, Orders, OrderPipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    AuthModule,
    LucideAngularModule.pick({
      ChartPie,
      Package,
      LayoutDashboard,
      DollarSign,
      TrendingUp,
      Download,
      Ellipsis,
      Pencil,
      Plus,
    }),
    NgApexchartsModule,
    SharedModule,
  ],
  providers: [
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
})
export class DashboardModule {}
