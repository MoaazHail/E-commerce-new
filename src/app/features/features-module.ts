import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './public/home/home';
import { ProductDetails } from './public/product-details/product-details';
import { FormField } from '@angular/forms/signals';
import {
  ChartPie,
  ChevronsLeft,
  ChevronsRight,
  DollarSign,
  Heart,
  LayoutDashboard,
  LucideAngularModule,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingCart,
  Smartphone,
  Star,
  Trash2,
  UserRound,
  Users,
} from 'lucide-angular';
import { Cart } from './public/cart/cart';
import { AppRoutingModule } from '../app-routing-module';
import { SharedModule } from '../shared/shared-module';
import { DashboardModule } from './private/dashboard-module';
import { Category } from './public/category/category';
import { NotFound } from './public/not-found/not-found';
import { Skeleton } from '../shared/skeletons/skeleton/skeleton';
import { Contact } from './public/contact/contact';
import { MainLayout } from '../shared/layout/main-layout/main-layout';
import { About } from './public/about/about';

@NgModule({
  declarations: [
    Home,
    Cart,
    ProductDetails,
    Category,
    NotFound,
    Skeleton,
    Contact,
    MainLayout,
    About,
  ],
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
      Smartphone,
      Phone,
      DollarSign,
      UserRound,
    }),
    AppRoutingModule,
    SharedModule,
    DashboardModule,
  ],
  exports: [Home, Cart, ProductDetails, LucideAngularModule, Skeleton],
})
export class FeaturesModule {}
