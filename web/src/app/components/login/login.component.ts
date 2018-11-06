import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';

// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public procesando: boolean = false;
  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router, 
    private api: ApiService,
    private notiServ : NotificationService
    ) {
    this.toast.toastr.setRootViewContainerRef(vcr);
    if(localStorage.getItem("token")){
      this.router.navigate(['/inicio/dashboard'])
    }
  }

  ngOnInit() {
    if (localStorage.getItem('cambio')) {
      // tslint:disable-next-line:prefer-const
      // this.eliminado(localStorage.getItem('cambio'));
      localStorage.clear();
    }
    if (localStorage.getItem('creado')) {
      // tslint:disable-next-line:prefer-const
      // this.creado(localStorage.getItem('creado'));
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
        this.notiServ.loadNotifications()
        this.toast.showSuccess("Sesion Iniciada Exitosamente");
        this.router.navigate(['/inicio/dashboard']);
      })
    }, (err: any) => {
      this.procesando = false;
      this.toast.showError(err.error.error.message);
      // this.showError()
    })
  }


  // socialSignIn(google) {
  //   console.log(google);
  //   this.facebookServicio.socialSignIn(google)
  //   .then(socialUser => {
  //   //   console.log('socialUser:');
  //   //   console.log(socialUser);
  //   //   this.userService.logSocialUser(socialUser)
  //   // .subscribe(
  //   //   (response: any) =>{
  //   //     console.log(response);
  //   //     let userid= response.datos.user.id;
  //   //     let tkn = response.datos.token.token;
  //   //     localStorage.setItem('tkntemplate', tkn);
  //   //     this.router.navigate(['/perfil/' + userid]);
  //   //   },
  //   //   error => console.log(<any>error));
  //   },
  //   error => console.log(<any>error));
  // }

  // showError() {
  //   this.toastr.error('No se ha iniciado sesión correctamente!', 'Acceso denegado!');
  // }
  // eliminado(texto) {
  //   this.toastr.error(texto, 'Error de sesión!');
  // }
  // creado(text) {
  //   this.toastr.success(text, 'Éxito');
  // }
}
