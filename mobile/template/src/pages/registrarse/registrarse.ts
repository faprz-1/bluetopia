import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController  } from 'ionic-angular';
/* import { NgForm} from '@angular/forms'; */
// import { LoginPage } from '../index.paginas';
// import {Observable} from 'rxjs/Observable';
/* import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms' */

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {


  constructor( 
    public alertCtrl: AlertController, 
    private navCtrl:NavController,
    public toastCtrl: ToastController) {}

  @ViewChild('fileInput') fileInput: ElementRef;
  img:string;
  image:any;
  users: any;

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image=<File>event.target.files[0];
      // reader.readAsDataURL(file);
      reader.onload = (readEvent) => {
        var binaryString = readEvent.target.result;
        this.img= btoa(binaryString);
        // this.img=file.name
        console.log("base 64 File: ",this.img);
      };
      reader.readAsBinaryString(file);
    }
  }

  createUser(user){
     //Para crear usuario en la BD
    user.img=this.img;
    console.log(user);  
    if((user.password == user.password1))  {
      
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