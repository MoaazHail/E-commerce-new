import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputField } from './input/input-field';
import {
  LucideAngularModule,
  EyeOff,
  Eye,
  Inbox,
  KeyRound,
  AtSign,
  LogOut,
  User,
  Search,
  ShoppingBag,
  Send,
  Facebook,
  Instagram,
} from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './layout/navbar/navbar';
import { AppRoutingModule } from '../app-routing-module';
import { Skeleton } from './skeletons/skeleton/skeleton';
import { Modal } from './modal/modal';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Footer } from './layout/footer/footer';
import { Twitter } from 'lucide-angular/src/icons';

@NgModule({
  declarations: [InputField, Navbar, Modal, AuthLayout, Footer],
  imports: [
    CommonModule,
    LucideAngularModule.pick({
      EyeOff,
      Eye,
      Inbox,
      KeyRound,
      AtSign,
      LogOut,
      User,
      Search,
      ShoppingBag,
      Send,
    }),
    ReactiveFormsModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  exports: [InputField, Modal, AuthLayout, Navbar, Footer],
})
export class SharedModule {}
