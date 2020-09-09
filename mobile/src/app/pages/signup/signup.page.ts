import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import * as moment from 'moment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends ComponentBase implements OnInit {
  signupForm : FormGroup;

  ngOnInit() {
    this.disableMenu();

    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    })
  }

  public async OnSignup() {
    if(!this.signupForm.valid)return;
    if(this.signupForm.value.password != this.signupForm.value.repeatPassword){
      this.ShowToast("La contraseña no coincide")
      return;
    }

    this.ShowLoading()
    this.api.post("/Usuarios/register", this.signupForm.value, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.ShowLoading();
    if(token){
      this.userData.GetUserWithAPIToken(token)
      await this.AfterSuccessfulSignup();
    }else{

    }
  } 

  private async AfterSuccessfulSignup() {
    this.DismissLoading();
    this.enableMenu();
    this.userData.loggedUser$.emit(true);
    this.navController.navigateRoot('dashboard');
  }

  public goToUrl(url) {
    this.navController.navigateRoot(url);
  }

  public async OnSocialLoginStart() {
    this.ShowLoading();
  }

  public async OnSocialLoginError(data) {
    this.ShowToast(data);
  }
}
