import { Component, OnInit, ViewContainerRef } from '@angular/core';
/*import { RegistrarseComponent} from "../registrarse/registrarse.component";*/
import {UserService} from '../../services/user.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { FacebookService } from '../../services/facebook.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private userService: UserService, private router: Router, private facebookServicio: FacebookService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    if (localStorage.getItem('cambio')) {
      // tslint:disable-next-line:prefer-const
      this.eliminado(localStorage.getItem('cambio'));
      localStorage.clear();
    }
    if (localStorage.getItem('creado')) {
      // tslint:disable-next-line:prefer-const
      this.creado(localStorage.getItem('creado'));
      localStorage.clear();
    }
  }

  login(user) {
    console.log(user);
    this.userService.logUser(user)
    .subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      user => {
        console.log(user);
       // tslint:disable-next-line:prefer-const
       let userid = user.id;
        // tslint:disable-next-line:prefer-const
        let tkn = user.api_token;
        localStorage.setItem('tkntemplate', tkn);
        localStorage.setItem('idtemplate', userid);
        this.router.navigate(['/perfil/' + userid]);
      },
      error => {
        console.log(<any>error);
        this.showError();
      });
    }

  //  socialSignIn(facebook){
    //  console.log(facebook);
      // this.facebookServicio.socialSignIn(facebook);
    // .subscribe(
    //   user =>{
    //     console.log(user);
    //     console.log('/perfil/'+user.id);
    //     this.router.navigate(['/perfil/'+user.id]);
    //   },
    //   error => console.log(<any>error));
  //  }


  socialSignIn(google) {
    console.log(google);
    this.facebookServicio.socialSignIn(google)
    .then(socialUser => {
      console.log('socialUser:');
      console.log(socialUser);
      this.userService.logSocialUser(socialUser)
    .subscribe(
      user => {
        console.log(user);
        // tslint:disable-next-line:prefer-const
        let userid = user.id;
        // tslint:disable-next-line:prefer-const
        let tkn = user.api_token;
        localStorage.setItem('tkntemplate', tkn);
        localStorage.setItem('idtemplate', userid);
        this.router.navigate(['/perfil/' + userid]);
      },
      error => console.log(<any>error));
    },
    error => console.log(<any>error));
  }

  showError() {
    this.toastr.error('No se ha iniciado sesión correctamente!', 'Acceso denegado!');
  }
  eliminado(texto) {
    this.toastr.error(texto, 'Error de sesión!');
  }
  creado(text) {
    this.toastr.success(text, 'Éxito');
  }
  }
