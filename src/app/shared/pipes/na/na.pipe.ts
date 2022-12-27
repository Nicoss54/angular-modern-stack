import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'na',
  standalone: true,
})
export class NaPipe implements PipeTransform {
  transform(value: string, customMessage = 'N/A'): unknown {
    return value || customMessage;
  }
}
