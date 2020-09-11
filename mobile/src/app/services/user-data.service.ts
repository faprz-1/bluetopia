import { Injectable, NgZone, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import * as moment from 'moment';
import { resolve } from 'url';
import { Storage } from '@ionic/storage';
import { PushService } from './push.service'
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public loggedUser:any =[];
  public loggedUser$:EventEmitter<Object> = new EventEmitter<Object>();
  constructor(
    private storage: Storage,
    private api: ApiService,
    private zone: NgZone,
    private pushService : PushService
  ) { 
  }
  ngOnInit(): void {
    this.getUserData()
  }
  public async getUserData(data : any = null) {
      await this.storage.ready()
      this.loggedUser = await this.storage.get("user");
      this.loggedUser$.emit(this.loggedUser);
  }
  public async GetUserWithAPIToken(token) {
    return new Promise(async(resolve,reject)=>{

      await this.storage.clear()
      await this.api.setToken(token.id)
      console.log("GetUserWithAPIToken");
      this.api.get("/Usuarios/withCredentials", true).subscribe(
        userFromServer => this.SaveUserData(userFromServer,token,resolve),
        error => {reject()}
        )
      })
  }
  public async refreshUser() {
    return new Promise(async(resolve,reject)=>{

      let token = await this.storage.get("ttl");
      this.api.get("/Usuarios/withCredentials", true).subscribe(
        userFromServer => this.SaveUserData(userFromServer,token,resolve),
        error => {reject()}
        )
      })
  }
  private async SaveUserData (userFromServer: JSON,ttl,resolve=()=>{}) {
    this.loggedUser = userFromServer;
    await this.storage.set("user", userFromServer)
    await this.storage.set("ttl",ttl)
    this.pushService.updatePushToken();
    this.getUserData();
    resolve();
  }  
}
