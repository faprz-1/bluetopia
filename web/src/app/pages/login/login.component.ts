import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { PushService } from '../../services/push.service';
import { ToastService } from '../../services/toast.service';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  environment = environment;

  passwordForgotten: boolean = false;
  public procesando: boolean = false;
  procesandoEmail: boolean = false;
  email = '';
  pin: string = '';
  newPassword: string = '';
  changuePass: boolean = false;
  tryPin: boolean = false;
  successUpdate: boolean = false;

  loginForm: FormGroup;

  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router,
    private api: ApiService,
    private notiServ: NotificationService,
    private pushService: PushService
  ) {
    if (localStorage.getItem("token")) {
      let user = this.api.GetUser();
      let role = user.role.name.toLowerCase();
      this.router.navigate([`/inicio/${role}/`]);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (localStorage.getItem('cambio')) {
      localStorage.clear();
    }
    if (localStorage.getItem('creado')) {
      localStorage.clear();
    }
  }

  Login(user: any) {
    this.procesando = true
    this.api.Post("/Usuarios/login", user, false).subscribe((token: any) => {
      localStorage.clear()
      this.api.SetToken(token.id);
      this.api.Get("/Usuarios/withCredentials", true).subscribe((userFromServer: any) => {
        this.procesando = false;
        localStorage.setItem("user", JSON.stringify(userFromServer));
        localStorage.setItem("ttl", moment().add(1209600, 's').toISOString())
        this.notiServ.LoadNotifications();
        this.pushService.getUserID();
        this.toast.ShowSuccess("Sesión iniciada exitosamente");
        let user = this.api.GetUser();
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

  SendEmail(email: {emailtoRecover: string}) {
    this.email = email.emailtoRecover;
    this.procesandoEmail = true;
    this.api.Post('/PasswordResetPINs/createAndSend', { email: this.email }, false).subscribe(
      (msg: any) => {
        if (msg.msg == 'notRegistered') {
          this.toast.ShowError('Usuario no registrado');
          this.procesando = false;
        } else {
          this.toast.ShowSuccess('Se envio el correo correctamente');
          this.tryPin = true;
        }
      }, (err: any) => {
        this.toast.ShowError(err.err);
        this.procesando = false;
        this.tryPin = false;
      });
  }

  TryPIN() {
    this.api.Post('/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false).subscribe((msg: any) => {
      if (msg.msg == 'Pin incorrecto') {
        this.toast.ShowError('PIN incorrecto');
        this.pin = '';
      }
      else {
        this.toast.ShowSuccess('PIN correcto');
        this.tryPin = false;
        this.changuePass = true;
      }
    });
  }

  SetPassword() {
    this.api.Post('/PasswordResetPINs/resetPassword', { password: this.newPassword, email: this.email }, false).subscribe(
      (res: any) => {
        if (res.msg == "usuario actualizado") {
          this.toast.ShowSuccess('Contraseña asignada correctamente');
          this.successUpdate = true;
          this.passwordForgotten = false;
          this.changuePass = false;
          this.procesando = false;
        }
        else {
          this.toast.ShowSuccess('Sucedio un Error');
        }
      }
    )
  }
}
