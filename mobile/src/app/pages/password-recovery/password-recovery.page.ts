import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

import { MenuService } from '../../services/menu.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { ToastAlertService } from '../../services/toast-alert.service';

import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage   implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;

  email: string;
  password: string;
  pin: string;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    protected navController: NavController,
    protected loading: LoadingService,
    public menu: MenuService,
    public api: ApiService,
    public toastAlert: ToastAlertService,
  ){}

  ngOnInit() {
    this.menu.Disable();
    this.slides.lockSwipes(true);
  }

  public goToUrl(url: string) {
    this.navController.navigateRoot(url);
  }

  public goBack() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  public sendEmail(){
    //Validations
    if(this.email == "" || !this.email) return this.toastAlert.ShowToast("Email inválido");
    this.loading.Show();
    this.api.post("/PasswordResetPINs/createAndSend", { email : this.email }, false).subscribe(
      response => this.successfullStep("Correo enviado correctamente"),
      error => this.api.HandleAPIError(error)     
    )
  }

  private async successfullStep(toastText: string = null) {

    this.loading.Dismiss();
    if(toastText) this.toastAlert.ShowToast(toastText);
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    //nest slide
  }  

  public validatePIN(){
    //Validations
    this.loading.Show()
    this.api.post("/PasswordResetPINs/consume", { pin: this.pin, email: this.email }, false).subscribe(
      (response:any) => {
        if(response.msg == "Pin correcto"){
          this.successfullStep();
          return;
        }  
        this.toastAlert.ShowToast(response.msg);
      } ,
      error => this.api.HandleAPIError(error)     
    )
  }

  public setNewPassword(){
    this.loading.Show()
    this.api.post("/PasswordResetPINs/resetPassword", { password: this.password , email: this.email }, false).subscribe(
      (response:any) => {
        this.toastAlert.ShowToast("Contraseña actualizada");
        this.goToUrl('/login');
      },
      error => this.api.HandleAPIError(error)     
    )
  }

}
