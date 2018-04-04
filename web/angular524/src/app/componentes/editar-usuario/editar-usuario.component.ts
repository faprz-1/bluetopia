import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usrid: string = localStorage.getItem('idtemplate');
  user = new User('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUser(this.usrid).subscribe(
      data => {
        console.log('data:', data);
        this.user.id = data['id'];
        this.user.nombres = data['nombres'];
        this.user.apellidos = data['apellidos'];
        this.user.email = data['email'];
        this.user.telefono = data['telefono'];
        this.user.sexo = data['sexo'];
      },
      error => console.log(<any>error));
  }

  goPerfil() {
    this.router.navigate(['/perfil/', this.usrid]);
  }

  updateUser(user) {
    console.log(user);
    this.userService.updateUser(user).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      user => {
        console.log(user);
        this.router.navigate(['/perfil/', this.usrid]);
      },
      error => console.log(<any>error));


  }

}
