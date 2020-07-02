import { NavController, NavParams, AlertController, ToastController, ModalController, LoadingController, IonRefresher, Platform, MenuController, ActionSheetController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { AlertInput, AlertButton } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { NotificationsService } from '../services/notifications.service';
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { PushService } from '../services/push.service';
import { EventsService } from '../services/events.service';
import { GetImageService } from '../services/get-image.service';

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
        protected actionSheetController: ActionSheetController,
        protected loadingController: LoadingController,
        protected platform: Platform,
        protected storage: Storage,
        protected menuController: MenuController,
        protected events: EventsService,
        public imageService: GetImageService,
        public camera: Camera,
        public translate: TranslateService,
        public api: ApiService,
        public notifications: NotificationsService,
        public pushService: PushService
    ) {
        this.InitializeLoadingElement()
        this.enableMenu()
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    loadingElement: HTMLIonLoadingElement;
    isLoading: boolean = false;
    user: any;

    protected async InitializeLoadingElement() {
        this.loadingElement = await this.loadingController.create({
            message: BASE_LOADING_MESSAGE,
            duration: BASE_LOADING_DURATION,
        })
    }

    protected ShowLoading() {
        if (this.loadingElement && !this.isLoading) {
            this.loadingElement.present()
            this.isLoading = true
        }
    }

    protected DismissLoading() {
        if (this.loadingElement) {
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

    protected async ShowOkAlert(header: string, subHeader: string, okButtonText: string = OK_ALERT_BUTTON_TEXT) {
        let alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            buttons: [okButtonText]
        })
        await alert.present()
    }

    protected async ShowPromptAlert(header: string, subHeader: string, okButtonText: string, okButtonHandler: any, cancelButtonText: string, cancelButtonHandler: any) {
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

    protected async ShowAlert(header: string, subHeader: string, inputs: AlertInput[], buttons: AlertButton[]) {
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
        if (this.platform.is('ios'))
            return SupportedPlatformsEnum.iOS
        else
            return SupportedPlatformsEnum.Android
    }

    protected enableMenu() {
        this.menuController.enable(true)
    }

    protected disableMenu() {
        this.menuController.enable(false)
    }

    protected async HandleAPIError(error) {
        this.DismissLoading()
        if(error.error.error != undefined) {
            this.ShowToast(error.error.error.message);
        }
    }

    protected async takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType: this.camera.PictureSourceType.CAMERA,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1280,
            targetHeight: 720,
            correctOrientation: true
        };
        try {
            let imageData = await  this.camera.getPicture(options);
            return  {
                  base64Image: imageData,
                  base64ImageExtention: ".jpeg",
                  resize : true
              };
        }
        catch(e) {
            this.ShowToast('No se obtuvo la imagen',3000)
            console.log("camera Error: ", e);
            return null;
        }
    };

    public openMenu() {
        this.menuController.open("templateMenu")
    }

    public closeMenu() {
        this.menuController.close("templateMenu")
    }
}
