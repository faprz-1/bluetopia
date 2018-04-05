import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms'
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) {}

  @ViewChild('fileInput') fileInput: ElementRef;
  sexos:string[]=["Hombre","Mujer"];
  img:string;
  image:File=null;
  users: Observable<User[]>;

  ngOnInit() {
  }

    onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image=<File>event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img=file.name
      };
    }
  }

  clearFile() {
    this.img=null;
    console.log(this.fileInput.nativeElement)
    /*this.fileInput.nativeElement.value = '';*/
  }


  createUser(user) {
   // Para crear usuario en la BD
  user.img = this.img;
  console.log(user);
  if ((user.password == user.password2) && user.password.length > 5 ){
    this.userService.createUser(user)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        user => {
          console.log(user);
          this.router.navigate(['/login']);
        },
        error => console.log(<any>error));

    // Para agregar la imagen... disque
    const imageData = new FormData();
    imageData.append('image', this.image, this.image.name);
    this.userService.uploadImage(imageData)
      .subscribe(
        image => {
          console.log(image);
        },
        error => console.error(<any>error));
  } else {
    console.error('Las contraseñas no coinciden!!!');
  }
  }
}
