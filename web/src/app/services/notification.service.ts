import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ApiService } from './api.service';

@Injectable()
export class NotificationService {
  public notifications: any = [];
  constructor(
    private socket: SocketService,
    private api: ApiService,
  ) 
  {}
  
  public Init() 
  {
    this.LoadNotifications();
    this.SusbcribeToNotifications();
  }

  public SusbcribeToNotifications() 
  {
    this.socket.Subscribe('notifications', JSON.parse(localStorage.getItem("user")).id, 'getNew',
      (socket) => {
        this.notifications.unshift(socket);
      }
    );
  }

  public LoadNotifications(last_id: boolean = false) 
  {
    let url = "/Notifications/getLast5";
    url += (last_id) ? "/" + last_id : "";

    this.api.Get(url).subscribe((data) => {
      this.notifications.push.apply(this.notifications, data);
    })
  }

  public CountUnseen() 
  {
    let count = 0;
    this.notifications.forEach(element => {
      if (element.seen == null)
        count++;
    });

    return count;
  }

  public async SetSeen(notification: any) 
  {
    if (notification.seen == null) 
    {
      let data = await this.api.Get("/Notifications/setSeen/" + notification.id);

      this.notifications.forEach((notification, index) => {
        if (notification.id == notification.id) 
          this.notifications[index] = data;
      })
    }
  }

  public PrepareUrl(url: string)
  {
    return (url.split("/#"))[1];
  }
}
