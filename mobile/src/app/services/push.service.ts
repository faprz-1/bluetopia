import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(
    private oneSignal: OneSignal,
    private api: ApiService,
    private storage: Storage
    ) { }

  startUpCOnfig() {
    this.oneSignal.startInit('540412ae-b99e-4c4c-843f-f05dabbb6a25', '1010469023639');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((not) => {
      // do something when notification is received
      console.log("handleNotificationReceived:",not);
      
    });

    this.oneSignal.handleNotificationOpened().subscribe((not) => {
      // do something when a notification is opened
      console.log("handleNotificationOpened:",not);
    });

    this.oneSignal.endInit();
  }

  updatePushToken(){
    this.storage.get("user").then((user) =>{ 
      this.oneSignal.getIds().then((info) => {
        this.api.post("/Usuarios/" + user.id + "/updatePushToken", {
          token: {
            token: info.userId,
            isMobile: true
          }
        }).subscribe(() => {});
      });
    }); 
  }
}
