import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController  } from 'ionic-angular';
/* import { NgForm} from '@angular/forms'; */
import { LoginPage } from '../index.paginas';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
import {Observable} from 'rxjs/Observable';
/* import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms' */

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {


  constructor( public alertCtrl: AlertController,
              private navCtrl:NavController,
              private userService: UserServiceProvider) {}

  @ViewChild('fileInput') fileInput: ElementRef;
  img:string;
  image:any;
  users: Observable<User[]>;

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

  /*clearFile() {
    this.img=null;
    this.fileInput.nativeElement.value = ' ';
  }*/

  createUser(user){
     //Para crear usuario en la BD
    user.img=this.img;
    console.log(user);    
    this.userService.createUser(user)
    .subscribe(
     user =>{
       console.log(user);
       this.navCtrl.popTo(LoginPage);
     },
     error => console.log(<any>error));

     //Para agregar la imagen... disque
    const imageData = new FormData();
    imageData.append('image', this.image, this.image.name);
    console.log(imageData);
    this.userService.uploadImage(imageData)
      .subscribe(
      image =>{
        console.log(image);
      },
      error => console.error(<any>error));
     
    }


  /*registrarse(formulario:NgForm){

    console.log("ngForm", formulario);
    console.log("valor formulario", formulario.value);

    let confirm = this.alertCtrl.create({
    title: '!!FELICIDADES¡¡',
    message: 'Tú registro fue todo un ! EXITO ¡',
    buttons: [
      {
        text: 'Iniciar Sección',
        handler: () => {

          this.navCtrl.push(LoginPage);

          console.log('Agree clicked');
        }
      }
    ]
  });
  confirm.present();
}*/
  }
