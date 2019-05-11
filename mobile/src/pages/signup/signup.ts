import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { User, ApiProvider } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';
import { NotificationProvider } from '../../providers/notification/notification';
import { Events } from 'ionic-angular';

import * as moment from 'moment';
import { timeout } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  @ViewChild('slides') slides: Slides;

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  loading = this.loadingCtrl.create({content: 'Cargando...', dismissOnPageChange: true});
  procesando: boolean = false

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private menuCtrl: MenuController,
    private api: ApiProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private notiCtrl : NotificationProvider,
    public events: Events
    ) {
    this.menuCtrl.enable(false)
  }

  ionViewDidLoad() {
    this.slides.onlyExternal = true;
  }

  toLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

 registrarUsuario(user,valid,registerForm)  {
   console.log(user);
   
    if(!valid){
      this.showToast("Completar los datos");
      return
    }else if(user.password != user.passwordConfirm){
      this.showToast("Las contraseñas no coinciden");
      return
    }
    this.loading.present();
    this.procesando = true
    this.api.post("/Usuarios/register", user, false).subscribe((resp: any) =>{
      this.doLogin(user);
    },err=>{

      console.log(err)
      this.loading.dismiss();
      this.procesando = false
      if(err.status == 500)
        this.showToast(err.error.error.message);
    });
  
  }

  // Attempt to login in through our User service
  doLogin(user) {

    this.api.post("/Usuarios/login", user, false).subscribe((token: any) =>{
      this.storage.clear().then(()=>{
        this.storage.set("token",token.id);
        this.api.token= token.id;

        this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
          this.loading.dismiss();
          this.procesando = false
          this.menuCtrl.enable(true);
          this.storage.set("user", userFromServer).then(()=>{
            this.storage.set("ttl", moment().add(1209600, 's').toISOString()).then(() => {
              
              this.notiCtrl.loadNotifications()
              this.events.publish('user:logged', true);
              this.navCtrl.setRoot('DashboardPage');
            })
          })
        })
      })
    }, (error: any) => {
      console.log("error Override:", error);
      this.loading.dismiss();
      this.procesando = false
      this.errorLogin();
    })
  }

  errorLogin(msg = null){
    this.storage.clear().then(()=>{
      let alert = this.alertCtrl.create({
        title: 'Acceso Denegado',
        subTitle: msg? msg : 'No se ha iniciado sesión correctamente',
        buttons: ['Ok']
      });
      alert.present();
    })
  }

  showToast(msg){
    let toast = this.toastCtrl.create({
          message: msg,
          duration: 2000
        });
        toast.present();
  }

  
}
