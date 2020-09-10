import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform, ActionSheetController } from '@ionic/angular';
import { AlertInput, AlertButton } from '@ionic/core';

const BASE_TOAST_DURATION = 3000;
const OK_ALERT_BUTTON_TEXT = 'OK';

const enum SupportedPlatformsEnum {
    Android,
    iOS
}

@Injectable({
	providedIn: 'root'
})
export class ToastAlertService {

	constructor(
		public alertController: AlertController,
        public actionSheetController: ActionSheetController,
        protected platform: Platform,
		protected toastController: ToastController) { }

	public async ShowToast(message: string, duration = BASE_TOAST_DURATION) {
        let toast = await this.toastController.create({
            message: message,
            duration: duration
        })
        await toast.present()
        return toast
    }

    public async ShowOkAlert(header: string, subHeader: string, okButtonText: string = OK_ALERT_BUTTON_TEXT) {
        let alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            cssClass: 'alert-color',
            buttons: [okButtonText]
        })
        await alert.present()
    }

    public async ShowPromptAlert(header: string, subHeader: string, okButtonText: string, okButtonHandler: any, cancelButtonText: string, cancelButtonHandler: any) {
        let alert = await this.alertController.create({
            header: header,
            cssClass: 'alert-color',
            subHeader: subHeader,
            buttons: [
                {
                    text: okButtonText,
                    handler: okButtonHandler
                },
                {
                    text: cancelButtonText,
                    role: 'cancel',
                    handler: cancelButtonHandler
                }
            ]
        })
        await alert.present()
    }

    public async ShowAlert(header: string, subHeader: string, inputs: AlertInput[], buttons: AlertButton[]) {
        let alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            cssClass: 'alert-color',
            inputs: inputs,
            buttons: buttons,
            mode: this.GetPlaform() == SupportedPlatformsEnum.Android ? 'md' : 'ios'
        })
        await alert.present()
    }

    public GetPlaform() {
        if (this.platform.is('ios'))
            return SupportedPlatformsEnum.iOS
        else
            return SupportedPlatformsEnum.Android
    }


}
