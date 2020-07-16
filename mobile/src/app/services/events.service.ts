import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
	
	private observables = [];

    publish(name:string,data, ...others) {
		if(!this.observables[name]){
			this.observables[name] = new Subject<any>();
		}
		if (others.length!=0){
			data = [...others,data ]
		}
		return this.observables[name].next(data);
    }

    getObservable(name:string): Subject<any> {
		if(!this.observables[name]){
			this.observables[name] = new Subject<any>();
		}
		return this.observables[name];
    }
}