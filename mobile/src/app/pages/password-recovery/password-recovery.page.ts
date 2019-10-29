import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage extends ComponentBase implements OnInit {
  @ViewChild('slides', {static: true}) slides: IonSlides;

  email: string;
  password: string;
  pin: string;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.disableMenu();
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
    if(this.email == "" || !this.email) return this.ShowToast("Email inválido");
    this.ShowLoading();
    this.api.post("/PasswordResetPINs/createAndSend", { email : this.email }, false).subscribe(
      response => this.successfullStep("Correo enviado correctamente"),
      error => this.HandleAPIError(error)     
    )
  }

  private async successfullStep(toastText: string = null) {

    this.DismissLoading();
    if(toastText) this.ShowToast(toastText);
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    //nest slide
  }  

  public validatePIN(){
    //Validations
    this.ShowLoading()
    this.api.post("/PasswordResetPINs/consume", { pin: this.pin, email: this.email }, false).subscribe(
      response => {
        if(response.msg == "Pin correcto"){
          this.successfullStep();
          return;
        }  
        this.ShowToast(response.msg);
      } ,
      error => this.HandleAPIError(error)     
    )
  }

  public setNewPassword(){
    this.ShowLoading()
    this.api.post("/PasswordResetPINs/resetPassword", { password: this.password , email: this.email }, false).subscribe(
      response => {
        this.ShowToast("Contraseña actualizada");
        this.goToUrl('/login');
      },
      error => this.HandleAPIError(error)     
    )
  }

}
