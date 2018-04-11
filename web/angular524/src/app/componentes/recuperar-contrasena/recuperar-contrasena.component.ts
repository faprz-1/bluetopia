import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  sendMail(correo) {
    this.userService.sendMail(correo)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          /* this.router.navigate(['/login']); */
        },
        error => {
          console.log(<any>error);
          this.showError();
        });

  }

  showError() {
    this.toastr.error('Este email no esta registrado en el sistema', 'Email incorrecto!');
  }
}
