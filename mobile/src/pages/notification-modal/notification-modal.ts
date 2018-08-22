import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  NotificationProvider
} from '../../providers/notification/notification';

/**
 * Generated class for the NotificationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification-modal',
  templateUrl: 'notification-modal.html',
})
export class NotificationModalPage {

  constructor(
    public navParams: NavParams,
    private notiServ: NotificationProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationModalPage');
  }

}