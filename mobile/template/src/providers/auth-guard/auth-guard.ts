import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserServiceProvider } from '../user/usersService';
import { User } from '../../models/user';
import { IonicPage} from 'ionic-angular';
import { LoginPage} from '../../pages/index.paginas';
/*
  Generated class for the AuthGuardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthGuardProvider {

private isLoggedIn = false;

  constructor() {
    console.log('Hello AuthGuardProvider Provider');
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;

  }

  authenticated(): boolean {
    return this.isLoggedIn;
    
  }




}
