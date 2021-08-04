import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor(
    private camera: Camera,
    private translate: TranslateService,
    private actionSheetController:ActionSheetController
  ) { }

  public async takePicture(): Promise<any> {
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
    return await this.GetImage(options);
  };

  public async openGallery (): Promise<any> {
    let options : CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL, 
      mediaType: this.camera.MediaType.PICTURE,     
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    };
    return await this.GetImage(options);
  }

  private async GetImage(options: CameraOptions) {
    try {
      let imageData = await  this.camera.getPicture(options);
      return {
        base64File: 'data:image/jpeg;base64,' + imageData,
        resize:true,
        fileExtention: ".jpeg",
      };
    }
    catch(e) {
      return null;
    }
  }

  public async GetImageActionSheet(){
    this.translate.get([
      'imageActionSheet.header',
      'imageActionSheet.cameraLabel',
      'imageActionSheet.galleryLabel',
      'cancelButtonLabel',
    ]).subscribe(translation => {
    let data;
    const actionSheet = await this.actionSheetController.create({
      header: translation['imageActionSheet.header'],
      buttons: [
        {
          text: translation['imageActionSheet.cameraLabel'],
          icon: 'camera',
          handler: () => this.takePicture().then(image => data = image),
        }, {
          text: translation['imageActionSheet.galleryLabel'],
          icon: 'images',
          handler: () => this.openGallery().then(image => data = image),
        },
        {
          text: translation['cancelButtonLabel'],
          icon: 'close',
          role: 'cancel',
          handler: () => undefined,
        }
      ]
    });

    await actionSheet.present();
    await actionSheet.onDidDismiss();
    return data;
  }
}
