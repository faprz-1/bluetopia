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
  showPassword : boolean = false;
  userType: string = '';
  teacherIdToAbsorb: string = '';
  studentGroupRegisterUid: string | null = null;
  userForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });
  userRegisterForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    workTitle: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, ValidationService.CheckOnlyIntegerNumbers]),
    school: new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, ValidationService.CheckOnlyIntegerNumbers]),
      address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    })
  });
  passwordForgotten: boolean = false;
  email = '';
  pin: string = '';
  newPassword: string = '';
  successUpdate: boolean = false;
  loading: boolean = false;;
  step: number = 0;
  pattern = new RegExp ('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
  school:any = null;

  public get schoolForm(): FormGroup {
    return this.userRegisterForm.get('school') as FormGroup;
  }

  public get canRegister() {
    switch (this.userType) {
      case 'estudiante': return false
      default: return true;
    }
  }

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
      this.teacherIdToAbsorb = params['teacherId'];
      this.studentGroupRegisterUid = params['registerUid'];
      if (this.userType == 'escuela' && !!this.teacherIdToAbsorb) this.FindSchoolInfo();
      if(!!this.teacherIdToAbsorb || !!this.studentGroupRegisterUid) this.registerStep = 2;
      if(this.userType == 'maestro') {
        this.userRegisterForm.get('phone')?.clearValidators();
        this.userRegisterForm.get('phone')?.setValidators([ValidationService.CheckOnlyIntegerNumbers]);
        this.schoolForm.get('phone')?.clearValidators();
        this.schoolForm.get('phone')?.setValidators([ValidationService.CheckOnlyIntegerNumbers]);
      }
    });
  }

  FindSchoolInfo(){
    this.api.Post('/Usuarios/SchoolByUsuario', { teacherId: this.teacherIdToAbsorb }).subscribe((school: any) => {
    this.school = school;
    if (!!school) {
      this.schoolForm.get('address')?.setValue(school.address) 
      this.schoolForm.get('address')?.disable(); 
      this.schoolForm.get('phone')?.setValue(school.phone) 
      this.schoolForm.get('phone')?.disable();
      this.schoolForm.get('name')?.setValue(school.name) 
      this.schoolForm.get('name')?.disable();
    }
    }, (err: any) => {
       this.toast.ShowWarning('Hubo un problema al obtener información');
    });
  }

  Back() {
    this.registerStep--;
  }

  Forward() {
    this.registerStep++;
  }

  OnPasswordChange() {
    const password = this.userRegisterForm.controls['password'].value;
    this.userRegisterForm.controls['confirmPassword'].setValidators([
      Validators.required,
      ValidationService.matchString(password, 'Las contraseñas no coinciden')
    ]);
    this.userRegisterForm.updateValueAndValidity();
  }

  RegisterUser() {
    if (this.userRegisterForm.invalid) {
      this.toast.ShowWarning('Favor de llenar todos los campos');
      return;
    }
    let userData = {...this.userRegisterForm.value};
    if(!!this.teacherIdToAbsorb) userData.teacherIdToAbsorb = this.teacherIdToAbsorb;
    let user = {
      email: userData.email,
      password: userData.password,
      active: true
    };
    if (this.userType == 'escuela' && !!this.teacherIdToAbsorb) {
      let { address, name, phone } = this.school
      userData.school = {
        'address' : address,
      'name' : name,
      'phone' : phone
    }
  }
    this.ApiRegisterUser(user, userData, this.userType.toLowerCase());
  }

  ApiRegisterUser(user: any, userData: any, role: string) {
    user.active = true;
    this.api.Post(`/Usuarios`, { user, userData, role}).subscribe(newUser => {
      let credentials = {
        email: !!user.email ? user.email : user.username,
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
          this.toast.ShowSuccess('Cuenta registrada correctamente');
          let user = this.api.GetUser();
          let role = user.role.name.toLowerCase();

          if(user.role.name == 'School' || user.role.name == 'Teacher') this.Forward();
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

  SendEmail(){
    this.loading = true;
    this.step = 1;
    this.api.Post('/PasswordResetPINs/createAndSend', { email: this.email }, false).subscribe(
      (msg: any) => {
        if (msg.msg == 'notRegistered') {
          this.toast.ShowError('Usuario no registrado');
          this.step = 0;
        } else {
          this.toast.ShowSuccess('Se envio el correo correctamente');
          this.step = 2;
        }
        this.loading = false;
      }, (err: any) => {
        this.toast.ShowError(err.err);
        this.loading = false;
        this.step=0;
      });
  }

  TryPIN() {
    this.loading = true;
    this.api.Post('/PasswordResetPINs/consume', { pin: this.pin, email: this.email }, false).subscribe((msg: any) => {
      if (msg.msg == 'Pin incorrecto') {
        this.toast.ShowError('PIN incorrecto');
        this.pin = '';
        this.step = 0;
        this.loading = false;
      }
      else {
        this.toast.ShowSuccess('PIN correcto');
        this.step = 3;
        this.loading = false;
      }
    }, (err: any) => {
      this.toast.ShowError(err.err);
      this.loading = false;
      this.step=0;
    });
  }

  SetPassword() {
    this.api.Post('/PasswordResetPINs/resetPassword', { password: this.newPassword, email: this.email }, false).subscribe(
      (res: any) => {
        if (res.msg == "usuario actualizado") {
          this.toast.ShowSuccess('Contraseña asignada correctamente');
          this.successUpdate = true;
         this.loading = false;
         this.step=0;
         this.passwordForgotten= false;
         this.email= "";
        }
        else {
          this.toast.ShowSuccess('Sucedio un Error');
          this.loading = false;
          this.step=0;
        }
      }
    )
  }

  GoBack(){
    this.passwordForgotten=false;
    this.step=0;
    this.loading=false;
  }
}
