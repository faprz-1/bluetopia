import { Injectable } from '@angular/core';  
import { AngularFireDatabase } from 'angularfire2/database';  
import { AngularFireAuth }     from 'angularfire2/auth';  
import * as firebase from 'firebase';  
  
import 'rxjs/add/operator/take';  
import { BehaviorSubject } from 'rxjs/BehaviorSubject'  
import { ApiService } from './api.service';  
import { EventsService } from 'angular4-events';  
 
@Injectable()  
export class MessagingService {  
  
  messaging = firebase.messaging()  
  currentMessage = new BehaviorSubject(null)  
  user:any = {}  
  constructor(  
    private db: AngularFireDatabase,   
    private afAuth: AngularFireAuth,  
    private api: ApiService ,  
    private events: EventsService  
 
  ) {  
    this.user = JSON.parse(localStorage.getItem("user"))  
   }  
  
  updateToken(token) {  
 
    this.api.post("/Usuarios/"+this.user.id+"/updatePushToken",{token:token}).subscribe(()=>{})  
    this.afAuth.authState.take(1).subscribe(user => {  
      if (!user) return;  
  
      const data = { [user.uid]: token }  
      this.db.object('fcmTokens/').update(data)  
      console.log("Token: ",token);  
        
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
        this.events.publish('message', payload)   
        this.currentMessage.next(payload)  
      });  
  
    }  
}