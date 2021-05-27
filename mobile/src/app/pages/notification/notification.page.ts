import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  ionViewDidEnter() {
    this.notifications.notifications = [];
    this.notifications.LoadNotifications();
  }

  DoRefresh(refresher) {
    this.notifications.notifications = [];
    this.notifications.LoadNotifications();
    setTimeout(() => {
      refresher.target.complete();
    }, 500)
  }

  SelectNotification(notification) {
    if(notification.data) {
      if(notification.data.action) {
        this.navController.navigateForward(
          notification.data.action,
          {
            queryParams: notification.data.queryParams || {},
          }
        )
      }
    }
  }

  get currentNotifications() {
    const notifications = JSON.parse(JSON.stringify(this.notifications.notifications));
    notifications.forEach(notification => notification.timestamp = moment(notification.timestamp).fromNow());
    return notifications;
  }

  constructor(
    public notifications: NotificationsService,
    private navController: NavController,
  ) {}

  NavigateBack() {
    this.navController.back();
  }
}
