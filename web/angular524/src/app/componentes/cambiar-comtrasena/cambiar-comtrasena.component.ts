import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-cambiar-comtrasena',
  templateUrl: './cambiar-comtrasena.component.html',
  styleUrls: ['./cambiar-comtrasena.component.css']
})
export class CambiarComtrasenaComponent implements OnInit {

  usrid: string = localStorage.getItem('idtemplate');

  constructor(private userService: UserService, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  updatePswrd(pass) {
    // tslint:disable-next-line:triple-equals
    if ((pass.password1 == pass.password2) && pass.password1.length > 5) {

    pass.id = localStorage.getItem('idtemplate');
    console.log('valor formulario', pass);
    this.userService.updatePswrd(pass)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          localStorage.setItem('cambio', 'Su contraseña ha sido cambiada');
          this.router.navigate(['/perfil/', this.usrid]);
        },
        error => {
          console.log(<any>error);
          this.showError('¡Contraseña actual incorrecta!');
         });
      } else {
        this.showError('¡Las contraseñas nuevas no coinciden!');
      }
  }

  goPerfil() {
    this.router.navigate(['/perfil/', this.usrid]);
  }

  showError(texto) {
    this.toastr.error(texto, 'Error:');
  }

}
