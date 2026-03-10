import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputField } from './input/input-field';
import { LucideAngularModule, EyeOff, Eye, Inbox, KeyRound, AtSign } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputField],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ EyeOff, Eye, Inbox, KeyRound, AtSign }),
    ReactiveFormsModule,
  ],
  exports: [InputField],
})
export class SharedModule {}
