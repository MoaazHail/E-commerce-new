import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Register } from './register/register';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing-module';
import {
  ALargeSmall,
  AtSign,
  Eye,
  EyeOff,
  Hash,
  Inbox,
  KeyRound,
  LucideAngularModule,
  VenusAndMars,
} from 'lucide-angular';
import { ForgotPassword } from './forgot-password/forgot-password';

@NgModule({
  declarations: [Login, Register, ForgotPassword],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LucideAngularModule.pick({
      EyeOff,
      Eye,
      Inbox,
      KeyRound,
      AtSign,
      Hash,
      ALargeSmall,
      VenusAndMars,
    }),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [Login],
  exports: [LucideAngularModule],
})
export class AuthModule {}
