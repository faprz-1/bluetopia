import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PushService } from 'src/app/services/push.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  loading: any = {
    checkingCode: false,
    updatingPassword: false
  };
  teacher: any = null;
  activationToken: string | null = null;
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor(
    public nav: NavigationService,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    private notiServ: NotificationService,
    private pushService: PushService,
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.activationToken = params['activationToken'];

      this.GetTeacher();
    });
  }

  GetTeacher() {
    this.loading.checkingCode = true;
    this.api.Get(`/Teachers/ByActivationToken/${this.activationToken}`).subscribe((teacher: any) => {
      this.teacher = teacher;
      this.loading.checkingCode = false;
    }, err => {
      console.error("Error getting teacher", err);
      this.loading.checkingCode = false;
      if(err.error.error.message == 'invalid token') {
        this.toast.ShowError(`Este link ya ha expirado`);
        // this.nav.GoTo('/');
      }
    });
  }

  OnPasswordChange() {
    const pass = this.passwordForm.get('password')?.value;
    this.passwordForm.get('confirmPassword')?.setValidators([
      Validators.required,
      Validators.minLength(3),
      ValidationService.matchString(pass)
    ]);
  }

  SetPasswordAndLogin() {
    if(this.passwordForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.passwordForm.markAllAsTouched();
      return;
    }
    let passwordForm = this.passwordForm.value;
    this.loading.updatingPassword = true;
    this.api.Patch(`/Teachers/${this.teacher.id}/Activate`, {password: passwordForm.password}).subscribe(teacherActivated => {
      this.Login({
        email: this.teacher.email,
        password: passwordForm.password
      });
    }, err => {
      console.error("error activating teacher", err);
      this.loading.updatingPassword = false;
    });
  }
  
  Login(user: any) {
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
        
        this.loading.updatingPassword = false;
        this.nav.GoTo(`/inicio/${role}/`);
      }, (err: any) => {
        this.loading.updatingPassword = false;
        this.toast.ShowError(err.error.error.message);
      })
    }, (err: any) => {
      this.loading.updatingPassword = false;
      this.toast.ShowError(err.error.error.message);
    });
  }

}
