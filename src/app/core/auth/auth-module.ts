import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Register } from './register/register';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing-module';
import { AtSign, Eye, EyeOff, Hash, Inbox, KeyRound, LucideAngularModule } from 'lucide-angular';

@NgModule({
  declarations: [Login, Register],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LucideAngularModule.pick({ EyeOff, Eye, Inbox, KeyRound, AtSign, Hash }),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [Login],
})
export class AuthModule {}
