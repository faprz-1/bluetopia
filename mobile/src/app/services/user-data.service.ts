import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { PushService } from './push.service';

const ROLES = ['User'];

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public loggedUser: any = [];
  public loggedUser$: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private api: ApiService,
    private pushService: PushService
  ) {
    this.pushService.Initialize();
    this.GetUserData();
  }

  public async GetUserData() {
    this.loggedUser = await this.api.GetUser();
    if (!this.loggedUser || !this.loggedUser.role || !ROLES.includes(this.loggedUser.role.name)) {
      this.LogOut();
    }
  }

  public async GetUserWithAPIToken(token) {
    await this.api.ClearStorage();
    await this.api.SetToken(token.id);
    const userFromServer = await this.api.Get('/Usuarios/withCredentials', true).toPromise();
    await this.SaveUserData(userFromServer, token);
  }

  public async RefreshUser() {
    const userFromServer = await this.api.Get('/Usuarios/withCredentials', true).toPromise();
    await this.SaveUserData(userFromServer);
  }

  public async SaveUserData(userFromServer: object, token? : {id, ttl}) {
    if (token) {
      await this.api.SetToken(token.id);
      await this.api.SetTTL(token.ttl);
    }

    this.loggedUser = userFromServer;
    if (!this.loggedUser || !this.loggedUser.role || !ROLES.includes(this.loggedUser.role.name)) {
      this.LogOut();
    } else {
      await this.api.SetUser(userFromServer);
    
      this.pushService.UpdatePushToken();
      this.loggedUser$.emit(this.loggedUser);
    }
  }

  public async LogOut() {
    if(await this.api.GetToken()) {
      await this.api.Post('/Usuarios/logout', null, true).toPromise();
      this.loggedUser = [];
      this.loggedUser$.emit(this.loggedUser);
    }
    await this.api.ClearStorage();
  }
}
