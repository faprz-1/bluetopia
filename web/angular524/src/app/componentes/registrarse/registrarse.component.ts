import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  sexos: string[] = ['Hombre', 'Mujer'];
  img: string;
  image: File = null;
  users: Observable<User[]>;

  ngOnInit() {
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
        this.img = file.name;
      };
    }
  }

  clearFile() {
    this.img = null;
    this.fileInput.nativeElement.value = '';
  }


  createUser(user) {
   // Para crear usuario en la BD
  user.img = this.img;
  console.log(user);
  // tslint:disable-next-line:triple-equals
  if ((user.password == user.password2) && user.password.length > 5 ) {
    this.userService.createUser(user)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          console.log('Usuario creado con exito');
          localStorage.setItem('creado', 'Por favor inicie sesión');
          this.router.navigate(['/login']);
          // tslint:disable-next-line:triple-equals
          if (this.img != undefined) {
            // Guardar la imagen
            const imageData = new FormData();
            imageData.append('image', this.image, this.image.name);
            console.log(imageData);
            this.userService.uploadImage(imageData)
              .subscribe(
                image => {
                  console.log(image);
                },
                error => {
                  console.error(<any>error);
                });
          } else {
            console.log('No se agregó imagen a su perfil');
          }
        },
        error => console.log(<any>error));
  } else {
    console.error('Las contraseñas no coinciden!!!');
    this.showError();
    }
  }

  showError() {
    this.toastr.error('Las contraseñas no coinciden!', 'Error:');
  }
}
