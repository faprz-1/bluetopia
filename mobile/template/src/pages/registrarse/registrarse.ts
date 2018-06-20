import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, LoadingController  } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {
  
  @ViewChild('fileInput') fileInput: ElementRef;
  img:string;
  image:any;
  users: any;

  constructor( 
    public alertCtrl: AlertController, 
    private navCtrl:NavController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private api: ApiProvider) {

  }


  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image=<File>event.target.files[0];
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        this.img= btoa(binaryString);
      };
      reader.readAsBinaryString(file);
    }
  }

  createUser(user){ 
    if ((user.password == user.password1)) {
      let userRequest = {
        user:{
          realm: user.nombres + user.apellidos,
          username: user.nombres,
          email: user.email,
          password: user.password
        },
        profileImage:{
          base64ProfileImage: this.img,
          base64ProfileImageExtention: "."+this.image.name.split('.')[1]
        }
      }
      let loading = this.loadingCtrl.create({content: 'cargando...', dismissOnPageChange: true});
      loading.present();
      this.api.post("/Usuarios/register",userRequest).subscribe(()=>{
        loading.dismiss();
        this.navCtrl.pop();
      })
      
    } else {
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