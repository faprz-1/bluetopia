import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController  } from 'ionic-angular';
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


  constructor( public alertCtrl: AlertController, private navCtrl:NavController, private userService: UserServiceProvider,
              public toastCtrl: ToastController) {}

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

  createUser(user){
     //Para crear usuario en la BD
    user.img=this.img;
    console.log(user);  
    if((user.password == user.password1))  {
      this.userService.createUser(user)
        .subscribe(
          user => {
            console.log(user);
            this.navCtrl.popTo(LoginPage);
            this.toastaction('Registro exitoso, ya puede iniciar sesión');
            if (this.img != undefined) {
              //Para agregar la imagen... disque
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
            }else{
              this.toastaction('No se agregó imagen a su perfil');
            }
          },
          error =>{
            console.log(<any>error); 
            this.toastaction('Error en el servidor, intente después');
          });
        }else{
      this.toastaction('Las contraseñas no coinciden');
        }
         
    }

  toastaction(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2500
    });
    toast.present();
  }
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
  
