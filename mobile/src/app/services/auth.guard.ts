import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { UserDataService } from './user-data.service';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  id: any;
  params: any;

  constructor(
    private navController: NavController, 
    private storage: Storage, 
    private userData: UserDataService,
    private api: ApiService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable < boolean > | Promise < boolean > | boolean {
    return new Promise(async resolve => {
      const token = await this.api.GetToken();
      const ttlSeconds = this.api.ttl || await this.api.GetTTL();
      const ttlDate = moment().add(ttlSeconds, 'seconds');

      if (!this.userData.loggedUser) {
        await this.userData.GetUserData();
      }

      if (!token || !ttlSeconds || ttlSeconds > 0 && moment().isAfter(ttlDate)) {
        await this.api.ClearStorage();
        resolve(false);
      } else if (next.data.hasOwnProperty('role')) {
        resolve(next.data.role == this.userData.loggedUser.role.name);
      } else if (token) {
        resolve(true);
      } else {
        await this.api.ClearStorage();
        resolve(false);
      }
    }).then(res => {
      return Boolean(res);
    });
  }
}
