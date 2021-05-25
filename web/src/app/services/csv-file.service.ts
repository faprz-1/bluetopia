import { Injectable } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { json2csv } from 'json2csv';

@Injectable({
  providedIn: 'root'
})
export class CsvFileService {
  public options: any = {
    fieldSeparator: ',',
    showLabels: true,
    keys: [],
    headers: []
  };

  constructor(
    private papa: Papa
  ) {}

  public ReadCSV(file_data: string): Promise<ParseResult> {
    const options = {
      header: true,
      skipEmptyLines: true,
      encoding: "ISO-8859-1",
      complete: (results: { data: any; }, file: any) => {
        return results.data;
      }
    };
    return Promise.resolve(this.papa.parse(file_data, options));
  }

  public GenerateCSV(name: any, data: any, keys = [], headers = []) {
    this.options.keys = keys;
    this.options.headers = headers;

    new json2csv(data, name, this.options);  //NO REVISADO DESPUES DE MOVER A ANGULAR 9
  }
}
