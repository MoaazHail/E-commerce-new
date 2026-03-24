import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputField } from './input/input-field';
import { LucideAngularModule, EyeOff, Eye, Inbox, KeyRound, AtSign, LogOut } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './layout/navbar/navbar';
import { AppRoutingModule } from '../app-routing-module';
import { Skeleton } from './skeletons/skeleton/skeleton';
import { Modal } from './modal/modal';

@NgModule({
  declarations: [InputField, Navbar, Skeleton, Modal],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ EyeOff, Eye, Inbox, KeyRound, AtSign, LogOut }),
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [InputField, Skeleton, Modal],
})
export class SharedModule {}
