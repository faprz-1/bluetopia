import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cambiar-comtrasena',
  templateUrl: './cambiar-comtrasena.component.html',
  styleUrls: ['./cambiar-comtrasena.component.css']
})
export class CambiarComtrasenaComponent implements OnInit {

  usrid: string = localStorage.getItem('idtemplate');

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  updatePswrd(pass) {
    if((pass.password1==pass.password2)&&pass.password1.length>5){

    pass.id = localStorage.getItem('idtemplate');
    console.log('valor formulario', pass);
    this.userService.updatePswrd(pass)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          this.router.navigate(['/perfil/', this.usrid]);
        },
        error => console.log(<any>error));
      }
  }

  goPerfil() {
    this.router.navigate(['/perfil/', this.usrid]);
  }

}
