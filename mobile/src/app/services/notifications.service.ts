import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { Platform, ModalController } from '@ionic/angular';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications: any = []; 
  public user:any;

  constructor(
    private socket: SocketService, 
    private api: ApiService, 
    private storage: Storage, 
    private platform: Platform, 
    private modalCtrl: ModalController, 
  ) { 
    this.getUser()
  }

  getUser(){ 
     
    this.storage.get("user").then((user) =>{ 
      this.user = user; 
      this.susbcribeToNotifications(); 
      this.loadNotifications(); 
    }); 
  } 

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

  async loadNotifications(last_id: boolean = false) { 
    if(this.user!=null){
      await this.platform.ready()
      await this.api.setToken(await this.storage.get("token"))

      console.log("adnotifications", last_id); 
      let url = "/Notifications/getLast5" 
      url += (last_id) ? "/" + last_id : ""; 
      console.log("adnotifications", url); 
      
      this.api.get(url).subscribe((data) => { 
        this.notifications.push.apply(this.notifications, data); 
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
