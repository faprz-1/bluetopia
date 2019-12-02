import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'UnitCurrency'})
export class unit_currency implements PipeTransform {
  transform(value: number): string {
    let stringValue = value.toString();
    let lengthValue = stringValue.length;

    return "$ " + stringValue.substr(0,lengthValue-2) + "." + stringValue.substr(lengthValue-2,lengthValue);
  }
}