import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CambiarContrasenaPage, LoginPage, EditarPage} from '../index.paginas';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
	user = {};
  imagenpefil = 'http://template3.test/laravel_5.6.9/public/';
  //imagenpefil = 'http://template3.0.test/servidor/laravel_5.6.9/public/';
  editar: any = EditarPage;
  cam_contra: any = CambiarContrasenaPage;

  img={nombre:String, id:localStorage.getItem("idtemplate")};
  image: any;
  users: any;
  

  constructor(
    private api: ApiProvider, 
    public navCtrl: NavController,
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');

    let id= localStorage.getItem("idtemplate");
    let myToken = localStorage.getItem('tkntemplate');
    // this.api.apiPost("getMyInfo",{token: myToken}).subscribe(
    //   (data: any) => {
    //     console.log ('data:',data.datos.user);
    //     this.user.id = data.datos.user['id'];
    //     this.user.nombres = data.datos.user ['nombres'];
    //     this.user.apellidos = data.datos.user ['apellidos'];
    //     this.user.email = data.datos.user ['email'];
    //     this.user.password = data.datos.user ['password'];
    //     this.user.telefono = data.datos.user ['telefono'];
    //     this.user.sexo = data.datos.user ['sexo'];
    //     this.user.imgperfil = data.datos.user ['imgperfil'];
    //   },
    //   error => console.log(<any>error));
  }

  // ionViewWillEnter(){

  //   let id = localStorage.getItem("idtemplate")

  //   this.userService.getUser(id).subscribe(
  //     data => {
  //       this.user.id = data['id'];
  //       this.user.nombres = data['nombres'];
  //       this.user.apellidos = data['apellidos'];
  //       this.user.email = data['email'];
  //       this.user.password = data['password'];
  //       this.user.telefono = data['telefono'];
  //       this.user.sexo = data['sexo'];
  //       this.user.imgperfil = data['imgperfil'];
  //     },
  //     error => console.log(<any>error));

  // }

  @ViewChild('fileInput') fileInput: ElementRef;

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.image = <File>event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.img.nombre = file.name;
        //Cambiando imagen en la bd
        console.log(this.img);
      };
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
