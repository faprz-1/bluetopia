import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


import { BehaviorSubject } from 'rxjs'
import { ApiService } from './api.service';
import { take } from 'rxjs/operators';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)
  user: any = {}
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private api: ApiService
  ) {
    this.user = JSON.parse(localStorage.getItem("user"))
  }

  updateToken(token) {

    this.api.Post("/Usuarios/" + this.user.id + "/updatePushToken", {
      token: {
        id: token,
        isMobile: false
      }
    }).subscribe(() => {})
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) return;

      const data = {
        [user.uid]: token
      }
      this.db.object('fcmTokens/').update(data)
      console.log("Token: ", token);

      // Add to localStorage
      let tokenList : Array<any> = JSON.parse(localStorage.getItem("fireTokens"))
      if(tokenList != null) { tokenList.push(token) }
      else { tokenList = [ token ] }
      localStorage.setItem("fireTokens", JSON.stringify(tokenList))
    })
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload: any) => {
      console.log("Message: ", payload);
      this.currentMessage.next(payload)
    });
  }
}
