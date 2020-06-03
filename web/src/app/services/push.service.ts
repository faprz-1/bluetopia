import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
declare var OneSignal: any;
const APP_ID="540412ae-b99e-4c4c-843f-f05dabbb6a25"
@Injectable({
  providedIn: 'root'
})

export class PushService {
  
  private oneSignalInit:any = false;
  public oneSignalId: any = ""
  constructor( private api: ApiService) {
    // console.log('OneSignal Service Init', this.oneSignalInit);
  }

  // Call this method to start the onesignal process.
  public init() {
      this.oneSignalId = localStorage.getItem("pushtoken")
      this.initOneSignal();
  }

  addScript(fileSrc, callback) {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = callback;
      script.src = fileSrc;
      head.appendChild(script);
  }

  initOneSignal() {
    OneSignal.push(function() {
      OneSignal.init({
        appId: APP_ID,
        path:"/assets/OneSignal/",
        // notifyButton: {
        //   enable: true,
        // },
        persistNotification: false,
        subdomainName: "templatejarabe",
      });
    });
    console.log('OneSignal Initialized');
    // OneSignal.push(function() {
    //   OneSignal.on('permissionPromptDisplay', function () {
    //     console.log("The prompt displayed");
    //     this.getUserID();
    //   });
    // });
   
    if(this.oneSignalId){
      console.log('Push notifications are enabled!');
      OneSignal.push(function() {
        OneSignal.on('notificationPermissionChange', function(permissionChange) {
          var currentPermission = permissionChange.to;
          console.log('New permission state:', currentPermission);
        });        
      });
    }else{
      this.checkIfSubscribed();
    }
  }

  subscribe() {
    OneSignal.push(() => {
        console.log('Register For Push');
        OneSignal.push(['registerForPushNotifications'])
        OneSignal.on('subscriptionChange', function(isSubscribed){
            console.log('The user\'s subscription state is now:', isSubscribed);
            OneSignal.getUserId().then((userId) => {
                console.log('User ID is', userId);
                this.oneSignalId = userId;
                this.UpdatePushToken();
            });
        });
    });
  }

  listenForNotification() {
    console.log('Initalize Listener');
    OneSignal.on('notificationDisplay', (event) => {
        console.log('OneSignal notification displayed:', event);
    });
  }

  getUserID() {
    OneSignal.getUserId().then((userId) => {
        console.log('User ID is', userId);
        this.oneSignalId = userId;
    });
  }

  checkIfSubscribed() {
    let self=this;
    console.log('checkIfSubscribed');
    OneSignal.push(function(){
        OneSignal.isPushNotificationsEnabled().then(function(isEnabled){
        console.log("enabled",isEnabled);
        if (isEnabled) {
          console.log('Push notifications are enabled!');
          self.getUserID();
          console.log('Push notifications are enabled!');
        } else {
          console.log('Push notifications are not enabled yet.');
          self.subscribe();
        }
      });
    })
    }

  UpdatePushToken() {
    // let token = localStorage.getItem('token');  
    // if(token){
    //   let user = JSON.parse(localStorage.getItem("user"))
    //   console.log('UpdatePushToken', OneSignal);
    //   OneSignal.getUserId().then((userId) => {
    //     console.log('User ID is', userId);
    //     this.oneSignalId = userId;
    //     this.api.Post("/Usuarios/" + user.id + "/updatePushToken", {
    //       token: {
    //         token: userId,
    //         isMobile: true
    //       }
    //     }).subscribe(() => {});
    //   },(err) =>{
    //     console.log("Error getting user Id", err);
        
    //   });
    // }
  }

}
