import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { UserService } from '../services/user.service';

import * as moment from 'moment';

@Injectable()

export class AuthGuard implements CanActivate {

  id: any;
  params: any;

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {
	let token = localStorage.getItem('token');
	
	let ttl = localStorage.getItem("ttl")
	if(ttl != null && moment().isSameOrAfter(ttl) ) {
		console.log("HI")
		localStorage.clear();
		return false
	}

    if (next.data.hasOwnProperty("role")) {
		return next.data.role == JSON.parse(localStorage.getItem("user")).role.name
    } else if (token) {
      return true;
	}
	
    this.router.navigate(['login']);
    return false;
  }

}
