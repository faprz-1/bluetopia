import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  	private loggedSubject = new Subject<any>();
  	private updatedUserSubject = new Subject<any>();

    publish(name:string, data: any = true) {
    	console.log('Publicar en ' + name + ' -> ' + data )
    	switch (name) {
    		case "user:logged":
    			this.loggedSubject.next(data);
    			break;
    		case "user:updated":
    			this.updatedUserSubject.next(data);
    			break;
    		
    		default:
    			console.log('Event '+ name +' not found')
    			break;
    	}
        
    }

    getObservable(name:string): Subject<any> {
    	console.log('Suscribir a ' + name  )
    	switch (name) {
    		case "user:logged":
    			return this.loggedSubject;
    			break;
    		case "user:updated":
    			return this.updatedUserSubject;
    			break;
    		
    		default:
    			console.log('Event '+ name +' not found')
    			break;
    	}
        
    }
}
