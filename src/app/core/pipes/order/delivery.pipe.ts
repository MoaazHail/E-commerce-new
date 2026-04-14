import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delivery',
  standalone: false,
})
export class DeliveryPipe implements PipeTransform {
  transform(isDelivered: boolean): string {
    if (isDelivered) {
      return 'Delivering';
    } else {
      return 'Processing';
    }
  }
}
