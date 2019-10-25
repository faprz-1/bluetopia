import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage extends ComponentBase implements OnInit {
  @ViewChild('slides') slides: IonSlides;

  email: string;
  password: string;
  pin: string;
  
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.disableMenu();
  }

  public goToUrl(url: string) {
    this.navController.navigateRoot(url);
  }

  public goBack() {
    this.slides.slidePrev();
  }

  public sendEmail(){
    //Validations
    this.ShowLoading();
    this.api.post("/PasswordResetPINs/createAndSend", { email : this.email }, false).subscribe(
      response => this.successfullStep("Correo enviado correctamente"),
      error => this.HandleAPIError(error)     
    )
  }

  private async successfullStep(toastText: string = null) {

    this.DismissLoading();
    if(toastText) this.ShowToast(toastText);
    this.slides.slideNext();
    //nest slide
  }  

  public validatePIN(){
    //Validations
    this.ShowLoading()
    this.api.post("/PasswordResetPINs/consume", { pin: this.pin, email: this.email }, false).subscribe(
      response => {
        console.log(response);
        this.successfullStep();
      } ,
      error => this.HandleAPIError(error)     
    )
  }

  public setNewPassword(){
    this.ShowLoading()
    this.api.post("/PasswordResetPINs/consume", { password: this.password , email: this.email }, false).subscribe(
      response => this.successfullStep("Contraseña actualizada"),
      error => this.HandleAPIError(error)     
    )
  }

}
