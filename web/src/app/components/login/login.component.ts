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
  users = {1:'user',2:'admin',3:'superuser'};

  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router, 
    private api: ApiService,
    private notiServ : NotificationService
  ) {
    if(localStorage.getItem("token")) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log(this.users[user.role.id]);
      
      this.router.navigate([`/inicio/${this.users[user.role.id]}/`]);
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
    this.api.post("/Usuarios/login", user, false).subscribe((token: any) =>{
      localStorage.clear()
      localStorage.setItem("token",token.id)
      this.api.token= token.id;
      this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
        this.procesando = false;
        localStorage.setItem("user", JSON.stringify(userFromServer));
        localStorage.setItem("ttl", moment().add(1209600, 's').toISOString() )
        this.notiServ.loadNotifications()
        this.toast.showSuccess("Sesion Iniciada Exitosamente");
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(user.role);
        console.log(this.users[user.role.id]);

        this.router.navigate([`/inicio/${this.users[user.role.id]}/`]);
      }, (err: any) => {
        this.procesando = false;
        this.toast.showError(err.error.error.message);
      })
    }, (err: any) => {
      this.procesando = false;
      this.toast.showError(err.error.error.message);
    })
  }

  sendEmail(email){
   
    console.log(email.emailtoRecover);
  this.email=email.emailtoRecover;
  this.procesandoEmail = true;
  this.api.post('/PasswordResetPINs/createAndSend', {email: this.email}, false).subscribe(
    (msg: any)=>{
      console.log(msg);
  if(msg.msg=='notRegistered'){
    this.toast.showError('Usuario no registrado');
    this.procesando = false;
   }else{
     this.toast.showSuccess('Se envio el correo correctamente');
    this.tryPin=true;
   }
    },(err: any)=>{
      this.toast.showError(err.err);
      this.procesando = false;
      this.tryPin=false;
    });
  }
  tryPIN(){
    this.api.post( '/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false ).subscribe( (msg: any) => {
      if(msg.msg=='Pin incorrecto'){
        this.toast.showError('PIN incorrecto');
        this.pin='';
      }
      else{
        this.toast.showSuccess('PIN correcto');
        this.tryPin=false;
        this.changuePass=true;
      }
  });
  }
  setPassword(){
  this.api.post( '/PasswordResetPINs/resetPassword', {password: this.newPassword , email: this.email}, false ).subscribe(
    (res:any) => {
      if (res.msg == "usuario actualizado") {
        this.toast.showSuccess('Contraseña asignada correctamente');
        this.successUpdate = true;
        this.passwordForgotten=false;
        this.changuePass=false;
        this.procesando = false;
      }
      else{
        this.toast.showSuccess('Sucedio un Error');
      }
    }
  )

  }
}
