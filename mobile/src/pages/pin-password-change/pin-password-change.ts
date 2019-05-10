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
  selector: 'page-pin-password-change',
  templateUrl: 'pin-password-change.html'
})
export class PinPasswordChangePage {
  @ViewChild('slides') slides: Slides;

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

  toLogin(){
    this.navCtrl.setRoot('LoginPage');
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
          this.toLogin();
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
