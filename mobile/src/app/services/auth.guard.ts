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

      if(!token) {
        await this.api.ClearStorage();
        resolve(false);
      }

      await this.userData.RefreshUser();
      resolve(!!this.userData.loggedUser);
    }).then(res => {
      return Boolean(res);
    });
  }
}
