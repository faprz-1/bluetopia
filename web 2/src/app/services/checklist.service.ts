import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ChecklistService {



  constructor(
              private api : ApiService) { 
		 
}
  
setCero(num){
	if(num<10)
		return "0"+num;
	return num;
}
  getAllSalida()
	{
		let link: string =  "/Usuarios/getUserLastCheck";
		
	    return this.api.get(
	    	link, 
	    	true
	    	// body, 
	    	); 
	  }
		addCheck(id){
			    let link: string = `/Usuarios/setNewCheck`;
				// let body = new FormData();    

			    // body.append(check);
			    // body.append('medic_id', this.authService.getMedicId());
			    return this.api.post(
			    	link, 
			    	{id},true
			    	); 

		}

  aumentarContador(check)
	{
	    let link: string = `/ChecklistSalidas/${check.id}`;
		// let body = new FormData();    

	    // body.append(check);
	    // body.append('medic_id', this.authService.getMedicId());
	    return this.api.patch(
	    	link, 
	    	check, 
	    	true
	    	); 
	  }

}
