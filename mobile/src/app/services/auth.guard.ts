import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

// import { UserService } from '../services/user.service';

@Injectable()

export class AuthGuard implements CanActivate {

  id: any;
  params: any;

  constructor(private navController: NavController, private storage: Storage) {}

  canActivate(next: ActivatedRouteSnapshot): Observable < boolean > | Promise < boolean > | boolean {
	let token = this.storage.get('token');
	
	let ttl = this.storage.get("ttl").toString();
	if(ttl != null && moment().isSameOrAfter(ttl) ) {
		this.storage.clear();
		return false
	}

  
  if (next.data.hasOwnProperty("role")) {
    return next.data.role == JSON.parse(JSON.stringify(this.storage.get("user"))).role.name
  } else if (token) {
    return true;
	}
	
    this.navController.navigateRoot('/login');
    return false;
  }

}
