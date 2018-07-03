import { ApiService } from './api.service';

import { Injectable } from '@angular/core';

@Injectable()
export class BugsService {

  constructor(
              private api : ApiService) { }
	getProyectBugs (id){
		
		let include = {"relation":"Tickets" ,"scope": {"relation":"tipoTickets",'order':["tipo ASC","prioridad ASC"]}};
		// let include = {"relation":"checklistSalidas" ,"scope": {"where":{"fecha":{'like':"2018-06-08"}}}};
	    let link: string =  "/proyectos/"+ id ;
		let body = new FormData();    

	    return this.api.get(
	    	link, 
	    	// body, 
	    	true,
	    	{"include":include}
	    	); 
	}

	addBug(id,bug){
	    let link: string = `/proyectos/${id}/Tickets`;
		// let body = new FormData();    

	    // body.append(check);
	    // body.append('medic_id', this.authService.getMedicId());
	    return this.api.post(
	    	link, 
	    	bug, 
	    	true
	    	); 
	}
}


