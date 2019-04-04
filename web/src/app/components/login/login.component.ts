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
  email='';
  pin: string = '';
  changuePass:boolean=false;
  tryPin:boolean=false;
  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router, 
    private api: ApiService,
    private notiServ : NotificationService,
    public toastr: ToastService
  ) {
    if(localStorage.getItem("token")) {
      this.router.navigate(['/inicio/dashboard'])
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
        this.router.navigate(['/inicio/dashboard']);
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
  this.procesando = true;
  this.api.post('/PasswordResetPINs/createAndSend', {email: this.email}, false).subscribe(
    (msg: any)=>{
      console.log(msg);
  if(msg.msg=='notRegistered'){
    this.toastr.showError('USUARIO NO REGISTRADO');
    this.procesando = false;
   }else{
     this.toastr.showSuccess('SE ENVIO EL CORREO CORRECTAMENTE');
    this.tryPin=true;
   }
    },(err: any)=>{
      this.toastr.showError(err.err);
      this.procesando = false;
      this.tryPin=false;
    });
  }
  tryPIN(){
    this.api.post( '/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false ).subscribe( (res: any) => {
      this.tryPin=false;
      this.changuePass=true;
  });
  }
  setPassword(password){
console.log(password);

  }
}
