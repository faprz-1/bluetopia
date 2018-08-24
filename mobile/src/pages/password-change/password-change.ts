import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';

/**
 * Generated class for the PasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {

  success : boolean = false
  processed : boolean = false

  processing : boolean = false
  user : any


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public api : ApiProvider,
    public storage : Storage,
    public toastCtrl : ToastController,
    private formBuilder : FormBuilder
  ) {
    this.user = JSON.parse(localStorage.getItem("user"))
    console.log("User: " + this.user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordChangePage');

    this.storage.get("token").then((token) =>{
      this.api.token = token;
    });
    this.storage.get("user").then((user) =>{
      this.user = user;
    });
  }

  changePassword(data)	{
    this.success = false
    this.processed = false
    this.processing = true

    if(data.passwordData.newPassword != data.passwordData.newPasswordConfirm) {
      let toast = this.toastCtrl.create({
        message: 'Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.processing = false
      
      return
    }

    let userLogin = { 'email' : this.user.email, 'password' : data.passwordData.newPassword }

    console.log("DATA : " + JSON.stringify(data))
    console.log("UserLogin: " + JSON.stringify(userLogin))

		this.api.post("/Usuarios/change-password", data.passwordData).subscribe(
      (output: any) => {
        // Volver a hacer login despues de cambiar contraseña
        this.api.post("/Usuarios/login", userLogin, false).subscribe((token: any) =>{
          this.success = true
          this.processing = false
          localStorage.clear()
          localStorage.setItem("token",token.id)
          this.api.token= token.id;
          this.api.get("/Usuarios/withCredentials", true).subscribe(
            (userFromServer: any)=>{
              localStorage.setItem("user", JSON.stringify(userFromServer))

              let toast = this.toastCtrl.create({
                message: 'Se ha cambiado la contraseña correctamente',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              
              this.navCtrl.pop()
            }
          )
        }, (error: any) => {
          this.processing = false
          let toast = this.toastCtrl.create({
            message: 'Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }, 
      (error: any) => {
        this.processing = false
        let toast = this.toastCtrl.create({
          message: 'Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      },
      () => {
        this.processed = true
      }
    )
  }

  goBack() {
    this.navCtrl.pop()
  }

}
