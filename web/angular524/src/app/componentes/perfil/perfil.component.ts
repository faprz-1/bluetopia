import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import {Http, Response} from '@angular/http';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy {
  id: any;
  user = new User ('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo', 'imgperfil', 'api_token');
  // imagenpefil = 'http://template3.test/laravel_5.6.9/public/';
  // imagenpefil = 'http://template3.0.test/servidor/laravel_5.6.9/public/';
  img = { nombre: String, id: localStorage.getItem('idtemplate') };
  image: any;
  users: Observable<User[]>;
  chngpass = false;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  @ViewChild('fileInput') fileInput: ElementRef;

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('idtemplate')).subscribe(
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

    if (localStorage.getItem('cambio')) {
        // tslint:disable-next-line:prefer-const
        let text = localStorage.getItem('cambio');
        this.showWarning(text);
        localStorage.removeItem('cambio');
      }

  }

  reload() {
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
              // Guardando la imagen
              const imageData = new FormData();
              imageData.append('image', this.image, this.image.name);
              console.log(imageData);
              this.userService.uploadImage(imageData)
                .subscribe(
                  image => {
                    console.log(image);
                    this.showInfo();
                  },
                  error => console.error(<any>error));
            },
            error => console.log(<any>error));
      };
    }
  }

  showInfo() {
    this.toastr.info('La imagen ha sido cambiada con exito');
  }

  showWarning(text) {
    this.toastr.warning(text, 'Cambio realizado:');
  }

}
