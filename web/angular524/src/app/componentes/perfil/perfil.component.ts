import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {Http, Response} from '@angular/http';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  id: any;
  params: any;
  user = new User ('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');
  imagenpefil = 'http://template3.test/laravel_5.6.9/public/';
  img = { nombre: String, id: localStorage.getItem('idtemplate') };
  image: any;
  users: Observable<User[]>;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  @ViewChild('fileInput') fileInput: ElementRef;

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params =>  this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
      data => {
        console.log (data);
        this.user.id = data['id'];
        this.user.nombres = data ['nombres'];
        this.user.apellidos = data ['apellidos'];
        this.user.email = data ['email'];
        this.user.password = data ['password'];
        this.user.telefono = data ['telefono'];
        this.user.sexo = data ['sexo'];
        this.user.imgperfil = data ['imgperfil'];
      },
      error => console.log(<any>error));
  }

  reload() {

    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.userService.getUser(this.id).subscribe(
      data => {
        this.user.id = data['id'];
        this.user.nombres = data['nombres'];
        this.user.apellidos = data['apellidos'];
        this.user.email = data['email'];
        this.user.password = data['password'];
        this.user.telefono = data['telefono'];
        this.user.sexo = data['sexo'];
        this.user.imgperfil = data['imgperfil'];
      },
      error => console.log(<any>error));

  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  editUser(id) {
    this.router.navigate(['/editar/', id]);
    console.log(id);
  }

  onFileChange(event) {
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      // tslint:disable-next-line:prefer-const
      let file = event.target.files[0];
      this.image = <File>event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img.nombre = file.name;
        // Cambiando imagen en la bd
        console.log(this.img);
        this.userService.cambioImg(this.img)
          .subscribe(
            user => {
              console.log(user);
              this.reload();
            },
            error => console.log(<any>error));
        // Guardando la imagen
        const imageData = new FormData();
        imageData.append('image', this.image, this.image.name);
        console.log(imageData);
        this.userService.uploadImage(imageData)
          .subscribe(
            image => {
              console.log(image);
            },
            error => console.error(<any>error));
      };
    }
  }

}
