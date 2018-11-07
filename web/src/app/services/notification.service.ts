import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ApiService } from './api.service';

@Injectable()
export class NotificationService {
  public notifications: any = [];
  constructor(
    private socket: SocketService,
    private api: ApiService,
  ) {
  }
  
  Init() {
    this.loadNotifications();
    this.susbcribeToNotifications();
  }

  susbcribeToNotifications() {
    //Suscripcion a notificaciones
    this.socket.subscribe({
        model: 'notifications',
        id: JSON.parse(localStorage.getItem("user")).id,
        method: 'getNew'
      },
      (socket) => {
        console.log("notificacion rebibida por socket", socket)
        this.notifications.unshift(socket)
      }
    );
  }
  loadNotifications(last_id: boolean = false) {
    console.log("adnotifications", last_id);
    let url = "/Notifications/getLast5"
    url += (last_id) ? "/" + last_id : "";
    console.log("adnotifications", url);

    this.api.get(url).subscribe((data) => {
      this.notifications.push.apply(this.notifications, data);
    })
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
