import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CambiarContrasenaPage, LoginPage, EditarPage} from '../index.paginas';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
	user: any = {};
  imagenpefil = this.api.baseURL;
  editar: any = EditarPage;
  cam_contra: any = CambiarContrasenaPage;

  img: any;
  image: any;
  users: any;
  ready: boolean = false

  constructor(
    private api: ApiProvider, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private storage: Storage) { 
      this.storage.get("user").then((user: any )=>{
        this.user.nombres = user.realm;
        this.user.email = user.email
        this.user.usuario = user.username
        this.user.imgperfil = this.api.baseURL+user.profileImage.URL
        this.ready = true;
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image=<File>event.target.files[0];
      // reader.readAsDataURL(file);
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        this.img= btoa(binaryString);
        // this.img=file.name
        console.log("base 64 File: ",this.img);
      };
      reader.readAsBinaryString(file);
    }
  }

 
  logout() {
  	localStorage.clear();
  	this.navCtrl.push(LoginPage);
  }

  ionViewCanEnter() {
   
  } 

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Acceso Denegado',
      subTitle: '!No se ha iniciado sesión correctamente!',
      buttons: ['(x_X)?']
    });
    alert.present();
  }

  toastimg() {
    let toast = this.toastCtrl.create({
      message: 'Imagen cambiada',
      duration: 2500
    });
    toast.present();
  }

  }
