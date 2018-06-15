import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.getUsers();
  }

  getUsers(){
  	// this.users = this.userService.getUsers();
  }

  editUser(id) {
    localStorage.setItem("editId", id);
    /* this.navCtrl.push(EditarUsuerPage); */
    console.log(localStorage.getItem("editId"));
  }

  deleteUser(id) {

  }

  ionViewCanEnter() {
    
  }
}
