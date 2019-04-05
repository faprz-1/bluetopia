import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import { UserService } from '../services/user.service';

import * as moment from 'moment';

@Injectable()

export class AuthSGuard implements CanActivate {

  id: any;
  params: any;

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable < boolean > | Promise < boolean > | boolean {

    
    let user = JSON.parse(localStorage.getItem("user"))
    if(user.role.id!=3){
        this.router.navigate(['inicio']);
        return false;
    }else{
        return true;
    }

  
	
    
  }

}
