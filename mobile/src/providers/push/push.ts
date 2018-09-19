import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api/api';

@Injectable()
export class PushProvider {

  options: PushOptions = {
    android: {
      senderID: '508289902153'
    },
    ios: {
      alert: 'true',
      badge: 'true',
      sound: 'true'
    },
    windows: {},
    browser: {}
  };

  pushObject: PushObject;
  main: any = null;
  token: string = "";
  interval: any;

  constructor(public platform: Platform, private push: Push, public storage: Storage, public api : ApiProvider) {

    platform.ready().then(() => {
      this.pushObject = this.push.init(this.options);

      if(this.pushObject != null) {
        console.log("PushObject creado")
      } else {
        console.log("Hubo un error al crear el PushObject")
      }

      // On registration, it obtains the Registration ID obtained and stores it
      // in the storage
      this.pushObject.on('registration').subscribe((registration: any) => {
        console.log("!!! PUSH REGISTERED")
        this.storage.set("pushToken", registration.registrationId).then((ready) => {
          this.token = registration.registrationId;
          console.log("TOKENPUSH ", this.token)
          this.storage.get('user').then((val) => {
            console.log("user: ", val)
            if (val != null) {;
              this.savePushToken(val.id);
            }
          });
        });

        console.log('Device registered', registration.registrationId);
      });


      this.pushObject.on('notification').subscribe((notificacion => {
        console.log("notConst", notificacion);
        this.checkMain().then((res) => {
          clearInterval(this.interval);
          this.main.manageNotification(notificacion);
        });
      }));

    });
  }

  listen() {
    return this.pushObject.on('notification');
  }

  setMain(main) {
    if(this.pushObject == null) {
      console.log("Condicion de carrera!")
      return
    } 

    this.main = main;
    //this.platform.ready().then(() => {
    this.pushObject.on('notification').subscribe((notificacion => {
      console.log("notConst", notificacion);
      this.checkMain().then((res) => {
        clearInterval(this.interval);
        this.main.manageNotification(notificacion);
      });
    }));
    //});
    return this.token;
  }

  checkMain() {
    let self = this;
    return new Promise((resolve, reject) => {
      this.interval = setInterval(() => {
        if (self.main) {
          resolve(true);
        }
      }, 500);
    });
  }

  savePushToken(id) {
    this.storage.get("pushToken").then((val) => {
      if(val != null) {
        console.log("Updating push token...", val)
        this.api.post("/Usuarios/" + id + "/updatePushToken", {token:{id: val, isMobile: true}}, true).subscribe(
          (succ) => {
            console.log(succ)
          },
          (error) => {
            console.log(error)
          }
        )
      }
    });
  }
}
