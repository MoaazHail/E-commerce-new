import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetails } from './public/product-details/product-details';
import { FormField } from '@angular/forms/signals';
import {
  BanknoteArrowUp,
  ChartPie,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  CreditCard,
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
import { Contact } from './public/contact/contact';
import { MainLayout } from '../shared/layout/main-layout/main-layout';
import { About } from './public/about/about';
import { Home } from './public/home/home';
import { Skeleton } from '../shared/skeletons/skeleton/skeleton';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Order } from './public/order/order';
import { CoreModule } from '../core/core-module';
import { Wishlist } from './public/wishlist/wishlist';

@NgModule({
  declarations: [
    Cart,
    Skeleton,
    Home,
    ProductDetails,
    Category,
    NotFound,
    Contact,
    MainLayout,
    About,
    Order,
    Wishlist,
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
      BanknoteArrowUp,
      CreditCard,
      Copy,
    }),
    AppRoutingModule,
    SharedModule,
    DashboardModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [Home, Cart, ProductDetails, LucideAngularModule],
})
export class FeaturesModule {}
