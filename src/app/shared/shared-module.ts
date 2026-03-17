import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputField } from './input/input-field';
import { LucideAngularModule, EyeOff, Eye, Inbox, KeyRound, AtSign, LogOut } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from './layout/navbar/navbar';
import { AppRoutingModule } from '../app-routing-module';

@NgModule({
  declarations: [InputField, Navbar],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ EyeOff, Eye, Inbox, KeyRound, AtSign, LogOut }),
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [InputField],
})
export class SharedModule {}
