import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { NotificationService } from '../../services/notification.service';

import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordForgotten:boolean = false;
  public procesando: boolean = false;
  procesandoEmail:boolean = false;
  email='';
  pin: string = '';
  newPassword: string = '';
  changuePass:boolean=false;
  tryPin:boolean=false;
  successUpdate: boolean=false;

  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router,
    private api: ApiService,
    private notiServ : NotificationService
  ) {
    if(localStorage.getItem("token")) {
      let user = JSON.parse(localStorage.getItem("user"));

      let role = user.role.name.toLowerCase();
      this.router.navigate([`/inicio/${role}/`]);
    }
  }

  ngOnInit() {
    if (localStorage.getItem('cambio')) {
      localStorage.clear();
    }
    if (localStorage.getItem('creado')) {
      localStorage.clear();
    }
  }

  login(user) {
    this.procesando = true
    this.api.Post("/Usuarios/login", user, false).subscribe((token: any) =>{
      localStorage.clear()
      this.api.SetToken(token.id);
      this.api.Get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
        this.procesando = false;
        localStorage.setItem("user", JSON.stringify(userFromServer));
        localStorage.setItem("ttl", moment().add(1209600, 's').toISOString() )
        this.notiServ.LoadNotifications()
        this.toast.ShowSuccess("Sesión iniciada exitosamente");
        let user = JSON.parse(localStorage.getItem("user"));
        let role = user.role.name.toLowerCase()

        this.router.navigate([`/inicio/${role}/`]);
      }, (err: any) => {
        this.procesando = false;
        this.toast.ShowError(err.error.error.message);
      })
    }, (err: any) => {
      this.procesando = false;
      this.toast.ShowError(err.error.error.message);
    })
  }

  sendEmail(email){

  this.email=email.emailtoRecover;
  this.procesandoEmail = true;
  this.api.Post('/PasswordResetPINs/createAndSend', {email: this.email}, false).subscribe(
    (msg: any)=>{
  if(msg.msg=='notRegistered'){
    this.toast.ShowError('Usuario no registrado');
    this.procesando = false;
   }else{
     this.toast.ShowSuccess('Se envio el correo correctamente');
    this.tryPin=true;
   }
    },(err: any)=>{
      this.toast.ShowError(err.err);
      this.procesando = false;
      this.tryPin=false;
    });
  }
  tryPIN(){
    this.api.Post( '/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false ).subscribe( (msg: any) => {
      if(msg.msg=='Pin incorrecto'){
        this.toast.ShowError('PIN incorrecto');
        this.pin='';
      }
      else{
        this.toast.ShowSuccess('PIN correcto');
        this.tryPin=false;
        this.changuePass=true;
      }
  });
  }
  setPassword(){
  this.api.Post( '/PasswordResetPINs/resetPassword', {password: this.newPassword , email: this.email}, false ).subscribe(
    (res:any) => {
      if (res.msg == "usuario actualizado") {
        this.toast.ShowSuccess('Contraseña asignada correctamente');
        this.successUpdate = true;
        this.passwordForgotten=false;
        this.changuePass=false;
        this.procesando = false;
      }
      else{
        this.toast.ShowSuccess('Sucedio un Error');
      }
    }
  )

  }
}