import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { UserDataService } from './user-data.service';

// import { UserService } from '../services/user.service';

@Injectable()

export class AuthGuard implements CanActivate {

  id: any;
  params: any;

  constructor(private navController: NavController, private storage: Storage, private userData: UserDataService) {}

   canActivate(next: ActivatedRouteSnapshot): Observable < boolean > | Promise < boolean > | boolean {
     return new Promise(async resolve => {

       let token = await this.storage.get('token');

       let ttl = await this.storage.get("ttl");
       if(this.userData.loggedUser===[]){
          this.userData.getUserData();
       }
       if ((ttl != null && moment().isAfter(moment(ttl.created).add(ttl.ttl,"s")))&& ttl.ttl!=-1) {
         this.storage.clear();
       resolve( false);
       return
      }
      
      
      if (next.data.hasOwnProperty("role")) {
        resolve( next.data.role == JSON.parse(JSON.stringify(this.storage.get("user"))).role.name);
        return
      } else if (token) {
        resolve( true);
        return
      }
      
       this.navController.navigateRoot('/login');
       resolve( false);
       return
     })
   }
}
