import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { ApiProvider } from '../api/api'; 
import { SocketProvider } from '../socket/socket'; 
import { Storage } from '@ionic/storage'; 
import { ModalController, Platform } from 'ionic-angular'; 
// import { NotificationModalPage } from '../../pages/notification-modal/notification-modal'; 
 
/* 
  Generated class for the ProvidersNotificationProvider provider. 
 
  See https://angular.io/guide/dependency-injection for more info on providers 
  and Angular DI. 
*/ 
@Injectable() 
export class NotificationProvider { 
  public notifications: any = []; 
  public user:any; 
  constructor( 
    private socket:SocketProvider, 
    private api: ApiProvider, 
    private storage: Storage, 
    private platform: Platform, 
    private modalCtrl:ModalController, 
  ) { 
    this.loadNotifications(); 
    this.getUser(); 
  } 
  getUser(){ 
     
    this.storage.get("user").then((user) =>{ 
      this.user = user; 
      this.susbcribeToNotifications(); 
    }); 
  } 
 
  // openModalNotifications(){ 
 
  //   const modal = this.modalCtrl.create("NotificationModalPage"); 
  //   console.log(modal); 
  //   modal.present(); 
  // } 
  susbcribeToNotifications() { 
    //Suscripcion a notificaciones 
    console.log(this.user);
    if(this.user!=null){

        this.socket.subscribe({ 
          model: 'notifications', 
          id: this.user.id, 
          method: 'getNew' 
        }, 
        (socket) => { 
          console.log("notificacion rebibida por socket", socket) 
          this.notifications.unshift(socket) 
        } 
      ); 
    }
  } 
  loadNotifications(last_id: boolean = false) { 
    if(this.user!=null){

      
      this.platform.ready().then(() => { 
        console.log("el ready"); 
        this.storage.get("token").then((token) =>{ 
          this.api.token = token; 
          console.log("adnotifications", last_id); 
          let url = "/Notifications/getLast5" 
          url += (last_id) ? "/" + last_id : ""; 
          console.log("adnotifications", url); 
          
          this.api.get(url).subscribe((data) => { 
            this.notifications.push.apply(this.notifications, data); 
          }) 
        }) 
      }) 
    }
  } 
 
  countUnseen() { 
    let count = 0; 
    this.notifications.forEach(element => { 
      if (element.seen == null) 
        count++; 
 
    }); 
    return count; 
  } 
  setSeen(not) { 
    let url = "/Notifications/setSeen/" + not.id 
    if (not.seen == null) { 
 
      this.api.get(url).subscribe((data) => { 
        console.log(data) 
        this.notifications.forEach((el, index) => { 
          if (el.id == not.id) { 
            this.notifications[index] = data; 
            console.log("seen") 
          } 
        }) 
      }) 
    } 
  } 
 
  prepareUrl(url){ 
    return (url.split("/#"))[1] 
  } 
} 
