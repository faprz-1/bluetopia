import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      if (it.Patient.User.first_name.toLowerCase().includes(searchText))
      	return true;
      if (it.Patient.User.last_name.toLowerCase().includes(searchText))
      	return true;
      if (it.Patient.User.email.toLowerCase().includes(searchText))
      	return true;
      return false;
    });
   }
}