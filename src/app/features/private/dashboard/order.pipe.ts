import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe',
  standalone: false,
})
export class OrderPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return 'completed';
    }
    return 'processing';
  }
}
