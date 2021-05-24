import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

declare var OneSignal: any;
const APP_ID = "540412ae-b99e-4c4c-843f-f05dabbb6a25";

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private oneSignalInit: any = false;
  public oneSignalId: any = ""
  constructor(
    private api: ApiService
  ) {}

  // Call this method to start the onesignal process.
  public init() {
    // this.oneSignalId = localStorage.getItem("pushtoken")
    this.initOneSignal();
  }

  addScript(fileSrc: string, callback: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = callback;
    script.src = fileSrc;
    head.appendChild(script);
  }

  initOneSignal() {
    OneSignal.push(function () {
      OneSignal.init({
        appId: APP_ID,
        path: "/assets/OneSignal/",
        // notifyButton: {
        //   enable: true,
        // },
        persistNotification: false,
        subdomainName: "templatejarabe",
      });
    });
    // OneSignal.push(function() {
    //   OneSignal.on('permissionPromptDisplay', function () {

    //     this.getUserID();
    //   });
    // });

    if (this.oneSignalId) {
      OneSignal.push(function () {
        OneSignal.on('notificationPermissionChange', function (permissionChange: { to: any; }) {
          var currentPermission = permissionChange.to;
        });
      });
    } else {
      this.checkIfSubscribed();
    }
  }

  subscribe(self = this) {
    OneSignal.push(() => {
      OneSignal.push(['registerForPushNotifications'])
      OneSignal.on('subscriptionChange', function (isSubscribed: any) {
        self.getUserID();
      });
    });
  }

  listenForNotification() {
    OneSignal.on('notificationDisplay', (event: any) => {
    });
  }

  getUserID(self = this) {
    OneSignal.getUserId().then(function (userId: any) {
      self.UpdatePushToken(userId)
    });
  }

  checkIfSubscribed() {
    let self = this;
    OneSignal.push(function () {
      OneSignal.isPushNotificationsEnabled().then(function (isEnabled: any) {
        if (isEnabled) {
          self.getUserID(self);
        } else {
          self.subscribe();
        }
      });
    })
  }

  UpdatePushToken(newtoken: string) {
    this.oneSignalId = localStorage.getItem("pushtoken")
    if (!this.oneSignalId || newtoken != this.oneSignalId) {
      localStorage.setItem("pushtoken", newtoken);
      let user = this.api.GetUser();
      if (user) {
        this.api.Post("/Usuarios/" + user.id + "/updatePushToken", {
          token: {
            id: newtoken,
            isMobile: false
          }
        }).subscribe(() => { })
      }
    }
  }
}
