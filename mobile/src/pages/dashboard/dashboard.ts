import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';

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
    private storage: Storage) { 
    this.reload();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  reload(refresher = null){
    this.ready = false;
    this.storage.get("user").then((user: any )=>{
      if(!user) return 0;
      this.api.get("/drivers/"+user.driver.id+"/getUpdatedInfo").subscribe((driver)=>{
        user.driver = driver;
        this.user = user;
        this.user.imgperfil = this.api.baseURL+user.profileImage.URL ? this.api.baseURL+user.profileImage.URL : this.api.baseURL
        this.storage.set("user", user);
        if(refresher) refresher.complete();
        this.ready = true;
      },
      err =>{
        this.user = user;
        this.user.imgperfil = this.api.baseURL+user.profileImage.URL ? this.api.baseURL+user.profileImage.URL : this.api.baseURL
        if(refresher) refresher.complete();
        this.ready = true;
      })
    })
  }

}
