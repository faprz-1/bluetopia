import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-recovey-contrasena',
  templateUrl: './recovey-contrasena.component.html',
  styleUrls: ['./recovey-contrasena.component.css']
})
export class RecoveyContrasenaComponent implements OnInit, OnDestroy {

  params: any;
  key: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router,
  public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.key = params['key']);
    this.userService.getUserRecovey(this.key).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(<any>error);
        this.router.navigate(['/login']);
        localStorage.setItem('cambio', 'Este enlace ya ha caducado');
      });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  changePswr(pass) {
    // tslint:disable-next-line:triple-equals
    if (pass.password1 == pass.password2) {

      pass.key = this.key;
      console.log('valor formulario', pass);
      this.userService.changePswr(pass)
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          user => {
            console.log(user);
            localStorage.setItem('creado', 'Su contraseña ha sido cambiada con éxito!');
            this.router.navigate(['/login']);
          },
          error => console.log(<any>error));
    } else {
      this.showError();
    }
  }

  showError() {
    this.toastr.error('Las contraseñas no coinciden!', 'Error:');
  }

}
