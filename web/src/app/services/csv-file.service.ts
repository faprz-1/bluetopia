import { Injectable } from '@angular/core';
import { Papa, PapaParseResult } from 'ngx-papaparse';
import { json2csv } from 'json2csv'; //NO REVISADO DESPUES DE MOVER A ANGULAR 9

@Injectable()
export class CsvFileService {

    public options:any = {
        fieldSeparator: ',',
        showLabels: true,
        keys: [],
        headers: []
    };

 	constructor( private papa: Papa,  ) { }

    public ReadCSV (file_data : string) : Promise<PapaParseResult>
    {
        const options = {
            header : true,
	        skipEmptyLines: true,
	        encoding: "ISO-8859-1",
            complete: (results, file) => {
                return results.data;
            }
        };
        return Promise.resolve(this.papa.parse(file_data, options));
	}

    public GenerateCSV (name, data, keys = [], headers = [])
    {
        this.options.keys = keys;
        this.options.headers = headers;

        new json2csv(data, name, this.options);  //NO REVISADO DESPUES DE MOVER A ANGULAR 9
    }
}
