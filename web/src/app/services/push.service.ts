import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
declare var OneSignal: any;

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
      // this.oneSignalInit ? console.log('Already Initialized') : this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', (callback) => {
      //     console.log('OneSignal Script Loaded');
      //     this.initOneSignal();
      //     this.oneSignalInit = true;
      // })
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
        appId: "540412ae-b99e-4c4c-843f-f05dabbb6a25",
      });
    });
    console.log('OneSignal Initialized');
    OneSignal.push(["registerForPushNotifications"]);
    // OneSignal.push(function () {
    //     console.log('Register For Push');
    //     OneSignal.setSubscription(true);
    //     OneSignal.on('subscriptionChange', function (isSubscribed) {
    //       console.log("The user's subscription state is now:", isSubscribed);
    //           OneSignal.getUserId().then(function (userId) {
    //               console.log("User ID is", userId);
    //           });
    //       });
    // });
    // this.checkIfSubscribed();
  }

  subscribe() {
    OneSignal.push(() => {
        console.log('Register For Push');
        OneSignal.push(['registerForPushNotifications'])
        OneSignal.on('subscriptionChange', (isSubscribed) => {
            console.log('The user\'s subscription state is now:', isSubscribed);
            this.listenForNotification();
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
        this.listenForNotification();
    });
  }

  getUserID() {
    OneSignal.getUserId().then((userId) => {
        console.log('User ID is', userId);
        this.oneSignalId = userId;
    });
  }

  checkIfSubscribed() {
    console.log('checkIfSubscribed');
    OneSignal.push(() => {
        /* These examples are all valid */
        OneSignal.isPushNotificationsEnabled((isEnabled) => {
            if (isEnabled) {
                console.log('Push notifications are enabled!');
                this.getUserID();
            } else {
                console.log('Push notifications are not enabled yet.');
                this.subscribe();
            }
        }, (error) => {
            console.log('Push permission not granted');
        });
    });
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
