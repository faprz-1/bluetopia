import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UserServiceProvider } from '../../providers/user/usersService';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {	
  image = 'http://template3.test/laravel_5.6.9/public/';
	users: Observable<User[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public userService:UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.getUsers();
  }

  getUsers(){
  	this.users = this.userService.getUsers();
  }

  editUser(id) {
    localStorage.setItem("editId", id);
    /* this.navCtrl.push(EditarUsuerPage); */
    console.log(localStorage.getItem("editId"));
  }

  deleteUser(id) {
    
    this.userService.deleteUser(id)
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        id => {
          console.log("Usuario Eliminado");
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        },
        error => console.log(<any>error));
    
  }

}
