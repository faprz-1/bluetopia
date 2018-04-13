import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CambiarContrasenaPage, LoginPage, EditarPage} from '../index.paginas';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
import { AuthGuardProvider } from '../../providers/auth-guard/auth-guard';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
	user = new User ('id', 'nombre', 'apellidos', 'email', 'password', 'telefono', 'sexo','imgperfil','api_token');
  imagenpefil = 'http://template3.test/laravel_5.6.9/public/';
  //imagenpefil = 'http://template3.0.test/servidor/laravel_5.6.9/public/';
  editar: any = EditarPage;
  cam_contra: any = CambiarContrasenaPage;

  img={nombre:String, id:localStorage.getItem("idtemplate")};
  image: any;
  users: Observable<User[]>;
  

  constructor(private authService:AuthGuardProvider, public navCtrl: NavController,
    public navParams: NavParams, public userService: UserServiceProvider, public alertCtrl: AlertController,
    public toastCtrl: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');

    let id=localStorage.getItem("idtemplate");

    this.userService.getUser(id).subscribe(
      data => {
        console.log ('data:',data);
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
  }

  ionViewWillEnter(){

    let id = localStorage.getItem("idtemplate")

    this.userService.getUser(id).subscribe(
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
        this.userService.cambioImg(this.img)
        .subscribe(
            user => {
              console.log(user);
              // Guardando la imagen
              const imageData = new FormData();
              imageData.append('image', this.image, this.image.name);
              console.log(imageData);
              this.userService.uploadImage(imageData)
                .subscribe(
                  image => {
                    console.log(image);
                  },
                  error => console.error(<any>error));
              this.navCtrl.setRoot(PerfilPage);
              this.toastimg();
            },
            error => console.log(<any>error));
      };
    }
  }

 
  logout() {
  	localStorage.clear();
  	this.navCtrl.push(LoginPage);
  }

  ionViewCanEnter() {
    let auth = (this.authService.authenticated());
    let tkn = localStorage.getItem('tkntemplate');

    if (auth && tkn) {
      console.log('Bienvenido (>.<)!');

    }else{
      console.error('Acceso Denegado (x_x)?');
      this.showAlert();
      
    }    

  return this.authService.authenticated();
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
