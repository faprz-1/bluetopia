import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage extends ComponentBase implements OnInit {

  private changePassForm: FormGroup;
  
  ngOnInit() {
    this.changePassForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      repPassword: new FormControl('', Validators.required)
    })
  }

  protected async OnSaved() {
    if (!this.changePassForm.valid) {
      return;
    }
    this.ShowLoading()
    if (this.CheckNewPasswrd()) {
      await this.storage.get("user").then((user)=>{
        this.user = user
      })
      let userLogin = { 'email' : this.user.email, 'password' : this.changePassForm.value.newPassword }
      this.api.post('/Usuarios/change-password', this.changePassForm.value).subscribe(
        output => this.login(userLogin),
        error => this.HandleAPIError(error)
      )
    }
  }

  public async login(data:any){
    this.ShowLoading()
    this.api.post("/Usuarios/login", data, false).subscribe(
      userToken => this.GetUserWithAPIToken(userToken),
      error => this.HandleAPIError(error)
    )
  }

  public async GetUserWithAPIToken(token) {
    this.ShowLoading();
    await this.storage.clear();
    await this.api.setToken(token.id);

    this.api.get("/Usuarios/withCredentials", true).subscribe(
      userFromServer => this.SaveUserData(userFromServer),
      error => this.HandleAPIError(error)
    )
  }

  private async SaveUserData(userFromServer: JSON) {
    await this.storage.set("user", userFromServer);
    await this.storage.set("ttl", moment().add(1209600, 's').toISOString());
    await this.AfterSuccessfulSignup();
  }

  private async AfterSuccessfulSignup() {
    this.DismissLoading();
    this.enableMenu();
    this.events.publish('user:logged', true);
    this.navController.navigateRoot('dashboard');
  }

  private async CheckNewPasswrd() {
    if (this.changePassForm.value.newPassword != this.changePassForm.value.repPassword || this.changePassForm.value.newPassword == this.changePassForm.value.oldPassword) {
      this.ShowToast('Hubo un error al cambiar la contraseña. Por favor revise si no hay errores.', 3000)
      this.DismissLoading()
      return false
    } else { return true }
  }

  goBack() {
    this.navController.back()
  }

}
