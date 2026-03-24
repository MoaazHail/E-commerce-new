import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './public/home/home';
import { ProductDetails } from './public/product-details/product-details';
import { FormField } from '@angular/forms/signals';
import {
  ChartPie,
  ChevronsLeft,
  ChevronsRight,
  Heart,
  LayoutDashboard,
  LucideAngularModule,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
  Users,
} from 'lucide-angular';
import { Cart } from './public/cart/cart';
import { AppRoutingModule } from '../app-routing-module';
import { SharedModule } from '../shared/shared-module';
import { DashboardModule } from './private/dashboard-module';

@NgModule({
  declarations: [Home, Cart, ProductDetails],
  imports: [
    CommonModule,
    FormField,
    LucideAngularModule.pick({
      ShoppingCart,
      Heart,
      Star,
      Trash2,
      Plus,
      Minus,
      Users,
      ChevronsLeft,
      ChevronsRight,
      ChartPie,
      Package,
      LayoutDashboard,
    }),
    AppRoutingModule,
    SharedModule,
    DashboardModule,
  ],
  exports: [Home, Cart, ProductDetails, LucideAngularModule],
})
export class FeaturesModule {}
