import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { NotificationService } from 'src/app/services/notification.service';
import { PushService } from 'src/app/services/push.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerStep: number = 1;
  userType: string = '';
  userForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });
  userRegisterForm: FormGroup = new FormGroup({
    schoolName: new FormControl(null, [Validators.required]),
    workTitle: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, ValidationService.CheckOnlyIntegerNumbers]),
    schoolPhone: new FormControl(null, [ValidationService.CheckOnlyIntegerNumbers]),
  });

  constructor(
    private navigation: NavigationService,
    private activeRoute: ActivatedRoute,
    private toast: ToastService,
    private api: ApiService,
    private notiServ: NotificationService,
    private pushService: PushService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activeRoute.params.subscribe(params => {
      this.userType = params['userType'];
    });
  }

  Register() {
    console.log(this.userForm);
    if(!this.userForm.valid) {
      this.toast.ShowWarning('Favor de llenar todos los campos para registrarse');
      return;
    }
    this.userRegisterForm.controls['email'].setValue(this.userForm.controls['email'].value);
    this.userRegisterForm.updateValueAndValidity();
    this.Forward();
  }

  Back() {
    this.registerStep--;
  }

  Forward() {
    this.registerStep++;
  }

  RegisterUser() {
    if (this.userForm.invalid || this.userRegisterForm.invalid) {
      this.toast.ShowWarning('Favor de llenar todos los campos');
      return;
    }
    let user = {...this.userForm.value, ...this.userRegisterForm.value};
    let userData = {...this.userRegisterForm.value, name: user.username};
    user.active = true;
    this.api.Post(`/Usuarios`, { user, userData, role: this.userType.toLowerCase() }).subscribe(newUser => {
      let credentials = {
        email: user.email,
        password: user.password
      };
      this.api.Post('/Usuarios/login', credentials).subscribe(token => {
        localStorage.clear();
        this.api.SetToken(token.id);
        this.api.Get("/Usuarios/withCredentials", true).subscribe((userFromServer: any) => {
          localStorage.setItem("user", JSON.stringify(userFromServer));
          localStorage.setItem("ttl", moment().add(1209600, 's').toISOString());
          this.notiServ.LoadNotifications();
          this.pushService.GetUserID();
          this.toast.ShowSuccess('Cuenta regstrada correctamente');
          let user = this.api.GetUser();
          let role = user.role.name.toLowerCase();

          if(user.role.name == 'School') this.Forward();
          else this.navigation.GoTo(`/inicio/${role}/`);
        }, (err: any) => {
          this.toast.ShowError(err.error.error.message);
        });
      });
    });
  }

  LoginUser() {
    const user = this.userForm.value;
    if(!user.email || !user.password) {
      this.toast.ShowWarning('Favor de escribir sus credenciales');
      return;
    }

    let credentials = {
      email: user.email,
      password: user.password
    };
    this.api.Post("/Usuarios/login", credentials, false).subscribe((token: any) => {
      localStorage.clear()
      this.api.SetToken(token.id);
      this.api.Get("/Usuarios/withCredentials", true).subscribe((userFromServer: any) => {
        localStorage.setItem("user", JSON.stringify(userFromServer));
        localStorage.setItem("ttl", moment().add(1209600, 's').toISOString());
        this.notiServ.LoadNotifications();
        this.pushService.GetUserID();
        this.toast.ShowSuccess("Sesión iniciada exitosamente");
        let user = this.api.GetUser();
        let role = user.role.name.toLowerCase();

        this.navigation.GoTo(`/inicio/${role}/`);
      }, (err: any) => {
        this.toast.ShowError(err.error.error.message);
      })
    }, (err: any) => {
      this.toast.ShowError(err.error.error.message);
    });
  }

}
