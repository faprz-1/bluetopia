import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  ToastController, 
  Platform, 
  MenuController, 
  ModalController,
  LoadingController
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
  mainLoading:any;
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
    private loadingCtrl: LoadingController,
    private storage: Storage ) { 

    this.reload();
    // this.initLoading(); 
  } 
  initLoading() { 
    this.mainLoading = this.loadingCtrl.create({ 
      content: "Cargando bitacoras..." 
    }); 
    this.mainLoading.present(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  openModalNotifications(){ 
 
    const modal = this.modalCtrl.create("NotificationModalPage"); 
    modal.present(); 
  } 

  reload(refresher = null){
    //Estas lineas van donde trae los primeros datos 
    if(this.mainLoading) this.mainLoading.dismiss();   
    if (refresher) refresher.complete(); 
  
  }

}
