import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Injectable()
export class CsvFileService {

    public options:any = {
        fieldSeparator: ',',
        showLabels: true,
        keys: [],
        headers: []
    };

 	constructor( private papa: Papa,  ) { }

	public readCSV (fileReaded_data){
        const options = {
            header : true,
	        skipEmptyLines: true,
	        encoding: "ISO-8859-1",
            complete: (results, file) => {
                return results.data;
            }
        };
        return Promise.resolve(this.papa.parse(fileReaded_data, options));	    
	}

    public generateCSV (name, data, keys = [], headers = []){
        this.options.keys = keys;
        this.options.headers = headers;

        new Angular5Csv(data, name, this.options);
    }
}