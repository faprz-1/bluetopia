import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { User, ApiProvider } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';
import { NotificationProvider } from '../../providers/notification/notification';

import * as moment from 'moment';
import { timeout } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('slides') slides: Slides;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  loading = this.loadingCtrl.create({content: 'Cargando...', dismissOnPageChange: true});
  procesando: boolean = false
  showSlides:boolean = false;
  email='';
  pin: string = '';
  newPassword: string = '';
  successUpdate: boolean=false;

  setDebugCount:number=5
  setDebugTimeout:any;

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
    private notiCtrl : NotificationProvider
    ) {
    this.menuCtrl.enable(false)
  }

  ionViewDidLoad() {
    this.slides.onlyExternal = true;
  }
    setDebugMode(){
      this.setDebugCount--;
      if(this.setDebugCount<0){
        this.setDebugCount=5;
      } else if(this.setDebugCount==0){
        this.api.setDebugMode()
        this.setDebugCount=5
        let toast = this.toastCtrl.create({
          message: 'Modo debug encendido',
          duration: 1500
        });
        toast.present();
      }
      if(this.setDebugCount<4 && this.setDebugCount>0){
        let toast = this.toastCtrl.create({
          message: 'Cambiar a modo debug en ...'+this.setDebugCount,
          duration: 800
        });
        toast.present();
      }
      clearTimeout(this.setDebugTimeout)
      this.setDebugTimeout= setTimeout(()=>{
        this.setDebugCount=5;
      },2000);
    }
    
  // Attempt to login in through our User service
  doLogin() {
    // let loading = this.loadingCtrl.create({content: 'autenticando...', dismissOnPageChange: true});
    this.loading.present();
    this.api.post("/Usuarios/login", this.account, false).subscribe((token: any) =>{
      this.storage.clear().then(()=>{
        this.storage.set("token",token.id);
        this.api.token= token.id;
        this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
          this.storage.set("user", userFromServer).then(()=>{
            this.storage.set("ttl", moment().add(1209600, 's').toISOString()).then(() => {
              this.loading.dismiss();
              this.menuCtrl.enable(true);
              
              this.notiCtrl.loadNotifications()
              this.navCtrl.setRoot('DashboardPage');
            })
          })
        })
      })
    }, (error: any) => {
      console.log("error Override:", error);
      this.loading.dismiss();
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

  sendEmail(){

    console.log(this.email);
    if(this.email == "" || this.email == undefined)
      return;

    this.procesando = true

    this.api.post('/PasswordResetPINs/createAndSend', {email: this.email}, false).subscribe(
      (msg: any)=>{

    this.procesando = false
    if(msg.msg=='notRegistered'){
      this.showToast('Usuario no registrado');

     }else{
      this.showToast('Se envio el correo correctamente');
      this.email = ""
      this.slides.slideNext();
     }
      },(err: any)=>{
        this.showToast(err.err);
        this.procesando = false
      });
  }

  tryPIN(){
    this.procesando = true
    this.api.post( '/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false ).subscribe( (msg: any) => {
      this.procesando = false
      if(msg.msg=='Pin incorrecto'){
        this.showToast('PIN incorrecto');
        this.pin='';
      }
      else{
        this.showToast('PIN correcto');
        this.slides.slideNext();
      }
  });
  }
  setPassword(){
    this.procesando = true
    this.api.post( '/PasswordResetPINs/resetPassword', {password: this.newPassword , email: this.email}, false ).subscribe(
      (res:any) => {
        this.procesando = false
        if (res.msg == "usuario actualizado") {
          this.successUpdate = true
          this.showToast('Contraseña asignada correctamente');
        }
        else{
          this.showToast('Sucedio un Error');
        }
      }
    )

  }

  showToast(msg){
    let toast = this.toastCtrl.create({
          message: msg,
          duration: 800
        });
        toast.present();
  }

  
}
