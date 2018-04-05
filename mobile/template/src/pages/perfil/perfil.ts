import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  editar: any = EditarPage;
  cam_contra: any = CambiarContrasenaPage;

  img={nombre:String, id:localStorage.getItem("idtemplate")};
  image: any;
  users: Observable<User[]>;
  

  constructor(private authService:AuthGuardProvider, public navCtrl: NavController,
              public navParams: NavParams, public userService:UserServiceProvider) { }

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
              this.navCtrl.setRoot(PerfilPage);
            },
            error => console.log(<any>error));
      //Guardando la imagen
        const imageData = new FormData();
        imageData.append('image', this.image, this.image.name);
        console.log(imageData);
        this.userService.uploadImage(imageData)
          .subscribe(
            image => {
              console.log(image);
            },
            error => console.error(<any>error));
        
      };
    }      

  }

/*   cambiarImg(user){
    user.img = this.img;
    console.log(user);
    this.userService.createUser(user)
      .subscribe(
        user => {
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
        image => {
          console.log(image);
        },
        error => console.error(<any>error));

  } */

 
  logout() {
  	localStorage.clear();
  	this.navCtrl.push(LoginPage);
  }

  /* ionViewCanEnter() {
    let auth = (this.authService.authenticated());
    let tkn = localStorage.getItem('tkntemplate');

    if (auth && tkn) {
      console.log('Bienvenido (>.<)!');      
    }else{
      console.error('Acceso Denegado (x_x)?');
      
    }    

  return this.authService.authenticated();
} */

  }
