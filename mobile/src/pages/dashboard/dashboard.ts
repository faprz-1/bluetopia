import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  ToastController, 
  Platform, 
  MenuController, 
  ModalController
} from 'ionic-angular';
import { ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';
import { NotificationProvider } from '../../providers/notification/notification';
import { NotificationModalPage } from '../../pages/notification-modal/notification-modal'; 
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  user: any = {};
  imagenpefil = this.api.baseURL;
  ready: boolean = false

  constructor(
    private api: ApiProvider, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public notiServ: NotificationProvider,
    public modalCtrl: ModalController,
    private platform:Platform, 
    private menuCtrl:MenuController, 
    private storage: Storage ) { 
      this.menuCtrl.enable(true) 

    this.reload();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  openModalNotifications(){ 
 
    const modal = this.modalCtrl.create("NotificationModalPage"); 
    modal.present(); 
  } 

  reload(refresher = null){
    this.ready = false;
  
  }

}
