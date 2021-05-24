import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localdate'
})
export class LocalDatePipe implements PipeTransform {

  transform(date: string): any {
    let localLenguaje = window.navigator.language;
    let newDate =  moment(date).locale(localLenguaje).format('DD MMMM, YYYY, h:mm a');
    let upperCaseDate = newDate.toUpperCase();
    let finallyDate = upperCaseDate.slice(0,1) + newDate.slice(1,newDate.length)
    return finallyDate;
  }

}
