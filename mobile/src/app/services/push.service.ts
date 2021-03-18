import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ApiService } from './api.service';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(
    private oneSignal: OneSignal,
    private api: ApiService,
    private platform: Platform,
  ) { }

  Initialize() {
    this.platform.ready().then(() => {
      this.oneSignal.startInit('bc10dcdc-d25d-4af3-88a7-88ce47b37a2a', '491186544546');
  
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  
      this.oneSignal.handleNotificationReceived().subscribe((not) => {
        // do something when notification is received
      });
  
      this.oneSignal.handleNotificationOpened().subscribe((not) => {
        // do something when a notification is opened
      });
  
      this.oneSignal.endInit();
    });
  }

  async UpdatePushToken() {
    await this.platform.ready();

    try {
      const user = await this.api.GetUser();
      const info = await this.oneSignal.getIds();

      this.api.Post(`/Usuarios/${user.id}/updatePushToken`, {
        token: {
          token: info.userId,
          isMobile: true
        }
      }).subscribe(() => undefined);
    } catch (error) {
      if (environment.production) {
        console.error(error);
      }
    }
  }
}
