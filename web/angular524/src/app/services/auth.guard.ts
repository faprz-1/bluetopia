import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable()


export class AuthGuard implements CanActivate {

	id:any;
	params:any;
	user = new User ('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo','imgperfil','api_token');

	constructor(private userService:UserService, private router:Router) {}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

	let tkn= localStorage.getItem("tkntemplate");	

  	if(tkn){

  		console.log("Bienvendio! (>.<)!");
  		return true;	
  	}
  	this.router.navigate(['login']); 
  	console.error("Acceso denegado!");
  	
  	return false;    
  }

  testkn():boolean{
  	let tkn= localStorage.getItem("tkntemplate");	
  	if(tkn){
  		return true;	
  	}
  	return false;
  }

}
