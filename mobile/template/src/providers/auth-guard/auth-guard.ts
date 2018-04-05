import { Injectable } from '@angular/core';
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

  logout(): boolean {
    localStorage.clear();
    this.isLoggedIn = false;
    return this.isLoggedIn;
  }

  authenticated(): boolean {
    return this.isLoggedIn;
    
  }

  testkn(): boolean {
    let tkn = localStorage.getItem('tkntemplate');
    let auth = (this.authenticated());
    if (tkn && auth) {
      return true;
    }else{
      return false;
    }  
  }

}
