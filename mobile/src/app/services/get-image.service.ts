import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GetImageService {

  constructor(private camera: Camera,private actionSheetController:ActionSheetController) { }

  public async takePicture() {
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
        console.log("camara",{
          base64File: imageData,
          resize:true,
          fileExtention: ".jpeg"
      })
        return {
          base64File: imageData,
          resize:true,
          fileExtention: ".jpeg"
          };
    }
    catch(e) {
        console.log("camera Error: ", e);
        return null;
    }
};
public async openGallery () {
    let options : CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL, 
      mediaType: this.camera.MediaType.PICTURE,     
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
   
    try {
        let imageData = await  this.camera.getPicture(options);
        console.log("REturning",{
          base64File: imageData,
          resize:true,
          fileExtention: ".jpeg"
      })
        return {
              base64File: imageData,
              resize:true,
              fileExtention: ".jpeg"
          };
    }
    catch(e) {
        console.log("camera Error: ", e);
        return null;
    }
   }

}
