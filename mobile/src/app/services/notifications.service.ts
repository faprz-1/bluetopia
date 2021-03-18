import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { Platform, ModalController } from '@ionic/angular';
import { SocketService } from './socket.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications: any = [];
  public user: any;

  constructor(
    private socket: SocketService,
    private api: ApiService,
    private storage: Storage,
    private platform: Platform,
    private modalCtrl: ModalController,
  ) {
    moment.locale('es');
    this.getUser();
  }

  getUser() {
    this.api.GetUser().then((user) => {
      this.user = user;
      this.SusbcribeToSocket();
      this.LoadNotifications();
    });
  }

  SusbcribeToSocket() {
    // Suscripcion a notificaciones
    if (this.user != null) {
        this.socket.Subscribe(
          'notifications',
          this.user.id,
          'getNew',
          (notification) => {
            notification.timestamp = moment(notification.timestamp);
            this.notifications.unshift(notification);
          }
      );
    }
  }

  async LoadNotifications(lastId: boolean = false) {
    if (this.user != null) {
      await this.platform.ready();
      await this.api.SetToken(await this.api.GetToken());

      let url = '/Notifications/getLast5';
      url += (lastId) ? '/' + lastId : '';

      this.api.Get(url).subscribe((data) => {
        data.forEach(notification => {
          notification.timestamp = moment(notification.timestamp);
        });
        this.notifications = [...data];
      });
    }
  }

  CountUnseen() { 
    return this.notifications.reduce((count, notification) => notification.seen ? count++ : count, 0);
  }

  public async SetSeen(notification: any) {
    if (notification.seen == null) {
      const data = await this.api.Get('/Notifications/setSeen/' + notification.id).toPromise();
      notification.seen = !!data.seen;
    }
  }

  PrepareUrl(url) {
    return (url.split('/#'))[1];
  }
}
