import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
  standalone: false,
})
export class SummaryPipe implements PipeTransform {
  transform(price: number): number {
    return +price.toFixed(3);
  }
}
