import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { DeliveryPipe } from './pipes/order/delivery.pipe';
import { SummaryPipe } from './pipes/order/summary.pipe';

@NgModule({
  declarations: [DeliveryPipe, SummaryPipe],
  imports: [CommonModule, AuthModule],
  exports: [DeliveryPipe, SummaryPipe],
})
export class CoreModule {}
