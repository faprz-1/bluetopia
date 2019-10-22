import { NavController, NavParams, AlertController, ToastController,ModalController,LoadingController,IonRefresher, Platform, MenuController, Events} from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { AlertInput, AlertButton } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { NotificationsService } from '../services/notifications.service';

const BASE_LOADING_MESSAGE = "Cargando..."
const BASE_LOADING_DURATION = 2000
const BASE_TOAST_DURATION = 3000

const OK_ALERT_BUTTON_TEXT = 'OK'

const enum SupportedPlatformsEnum {
    Android,
    iOS
}

export class ComponentBase {
    constructor(
        protected navController: NavController,
        protected alertController: AlertController,
        protected toastController: ToastController,
        protected modalController: ModalController,
        protected loadingController: LoadingController,
        protected platform: Platform,
        protected storage: Storage,
        protected menuController : MenuController,
        protected events: Events,
        public  translate: TranslateService,
        public  api: ApiService,
        public  notifications: NotificationsService
    ) {
        this.InitializeLoadingElement()
        this.enableMenu()
    }

    loadingElement : HTMLIonLoadingElement;
    isLoading : boolean = false;

    protected async InitializeLoadingElement() {
        this.loadingElement = await this.loadingController.create({ 
            message: BASE_LOADING_MESSAGE,
            duration: BASE_LOADING_DURATION,
        })
    }

    protected ShowLoading() {
        if(this.loadingElement && !this.isLoading) {
            this.loadingElement.present()
            this.isLoading = true
        }
    }

    protected DismissLoading() {
        if(this.loadingElement) {
            this.loadingElement.dismiss()
            this.isLoading = false
        }
    }

    protected async ShowToast(message: string, duration = BASE_TOAST_DURATION) {
        let toast = await this.toastController.create({
            message: message,
            duration: duration
        })
        await toast.present()
        return toast
    }

    protected async ShowOkAlert(header: string, subHeader:string, okButtonText: string = OK_ALERT_BUTTON_TEXT) {
        let alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            buttons: [okButtonText]
        })
        await alert.present()
    }

    protected async ShowPromptAlert(header: string, subHeader:string, okButtonText: string, okButtonHandler: any, cancelButtonText: string, cancelButtonHandler: any) {
        let alert = await this.alertController.create({
            header: header,
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

    protected async ShowAlert(header: string, subHeader:string, inputs : AlertInput[], buttons: AlertButton[]) {
        let alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            inputs: inputs,
            buttons: buttons,
            mode: this.GetPlaform() == SupportedPlatformsEnum.Android ? 'md' : 'ios'
        })
        await alert.present()
    }

    protected async OpenModal(component: any) {
        const modal = await this.modalController.create({ component: component })
        return await modal.present()
    }

    protected GetPlaform() {
        if(this.platform.is('ios'))
            return SupportedPlatformsEnum.iOS
        else
            return SupportedPlatformsEnum.Android
    }

    protected enableMenu() {
        this.menuController.enable(true, "templateMenu")
    }

    protected disableMenu() {
        this.menuController.enable(false, "templateMenu")
    }

    protected async HandleAPIError(error) {
        this.DismissLoading()
        this.ShowToast(error.error.error.message)
      }

    public openMenu() {
        this.menuController.open("templateMenu")
    }

    public closeMenu() {
        this.menuController.close("templateMenu")
    }
}
