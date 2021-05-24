import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jarabeFilter'
})
export class JarabeFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchPlace: []): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      let includes: boolean = false;
      searchPlace.map((search: string) => {
        let keyArray = search.split("/").filter(f => f);
        let itemValue = this.GetValueFromArray(item, keyArray)
        includes = includes || itemValue.toLowerCase().includes(searchText)
      })
      return includes;
    });
  }

  GetValueFromArray(item: any, keyArray: any): any {
    if (keyArray == 0) {
      return item;
    } else {
      let key = keyArray.shift();
      return this.GetValueFromArray(item[key], keyArray)
    }
  }
}
