import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import FileToUpload from '../interfaces/file-to-upload.interface';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var cordova;

enum FileActionSheetType {
  Audio = 'audio/*',
  Image = 'image/*',
  Video = 'video/*',
};

@Injectable({
  providedIn: 'root'
})
export class GetFileService {
  fileTransfer: FileTransferObject;

  constructor(
    private translate: TranslateService,
    private actionSheetController: ActionSheetController,
    private platform: Platform,

    private mediaCapture: MediaCapture,
    private fileChooser: Chooser,
    private transfer: FileTransfer, 
    private androidPermissions: AndroidPermissions,
  ) { }

  public async GetImage(fileInput?): Promise<FileToUpload[]> {
    try {
      if (this.platform.is('cordova')) {
        return await this.GetActionSheet(FileActionSheetType.Image);
      } else if (fileInput) {
        return await this.RequestFileFromDevice(fileInput, FileActionSheetType.Image);
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async GetVideo(fileInput?): Promise<FileToUpload[]> {
    try {
      if (this.platform.is('cordova')) {
        return await this.GetActionSheet(FileActionSheetType.Video);
      } else if (fileInput) {
        return await this.RequestFileFromDevice(fileInput, FileActionSheetType.Video);
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async GetAudio(fileInput?): Promise<FileToUpload[]> {
    try {
      if (this.platform.is('cordova')) {
        return await this.GetActionSheet(FileActionSheetType.Audio);
      } else if (fileInput) {
        return await this.RequestFileFromDevice(fileInput, FileActionSheetType.Audio);
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }


  private GetActionSheet(type: FileActionSheetType): Promise<FileToUpload[]> {
    return new Promise(async (resolve, reject) => {
      let captureFunction;
      switch (type) {
        case FileActionSheetType.Audio:
          captureFunction = this.CaptureAudio;
          break; 
        case FileActionSheetType.Image:
          captureFunction = this.CaptureImage;
          break; 
        case FileActionSheetType.Video:
          captureFunction = this.CaptureVideo;
          break; 
      }

      const actionSheet = await this.actionSheetController.create({
        header: 'Subir imagen desde...',
        buttons: [
          {
            text: 'Cámara',
            icon: 'camera',
            handler: async () => {
              let files = [];

              switch (type) {
                case FileActionSheetType.Audio:
                  files = await this.CaptureAudio();
                break; 
                case FileActionSheetType.Image:
                  files = await this.CaptureImage();
                break; 
                case FileActionSheetType.Video:
                  files = await this.CaptureVideo();
                break; 
              }
              resolve(files);
            },
          }, {
            text: 'Galería',
            icon: 'images',
            handler: () => this.GetFile(String(type)).then(file => resolve([file])),
          },
          {
            text: 'Cancelar',
            icon: 'close',
            role: 'cancel',
            handler: () => resolve(null),
          }
        ]
      });

      await actionSheet.present();
      await actionSheet.onDidDismiss();
    });
  }


  
  // ==============================================================================================
  // Capture Methods
  // ==============================================================================================

  public async CaptureImage() {
    let options: CaptureImageOptions = {};
    
    try {
      const data = await this.mediaCapture.captureImage(options);
      console.log(data);
      return await this.GetFilesData(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async CaptureVideo(duration = 30) {
    let options: CaptureVideoOptions = {
      duration,
    };
    
    try {
      const data = await this.mediaCapture.captureVideo(options);
      return await this.GetFilesData(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async CaptureAudio() {
    let options: CaptureAudioOptions = {};
    
    try {
      const data = await this.mediaCapture.captureAudio(options);
      return await this.GetFilesData(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private async GetFilesData(mediaFiles): Promise<FileToUpload[]> {
    this.fileTransfer = this.transfer.create();

    const files: FileToUpload[] = [];
    for (const mediaFile of mediaFiles) {
      console.log(mediaFile, cordova.file);
      const fileEntry = await this.fileTransfer.download(mediaFile.fullPath, cordova.file.cacheDirectory + mediaFile.name);
      console.log(fileEntry);

      const base64File = await this.ReadFile(fileEntry);
      files.push({
        uri: mediaFile.localURL,
        base64File: `data:${mediaFile.type};base64,` + base64File,
        resize:true,
        fileExtention: `.${mediaFile.type.split('/')[1]}`,
      });
    }

    return files;
  }


  private ReadFile(fileEntry): Promise<string> {
    const _this = this;
    return new Promise((resolve, reject) => {
      fileEntry.file(
        file => {
          var reader = new FileReader();
          reader.onloadend = function() {
            const base64Data = _this.ConvertToBase64(<ArrayBuffer>this.result);
            resolve(base64Data);
          };

          reader.readAsArrayBuffer(file);
        }, 
        error => reject(error),
      );
    });
  }


  // ==============================================================================================
  // FileChooser Methods
  // ==============================================================================================

  public async GetFile(mime: string): Promise<FileToUpload> {
    this.fileTransfer = this.transfer.create();
    try {
      const file = await this.fileChooser.getFile(mime);
      console.log(file);
      var arrayBuffer = file.data.buffer.slice(file.data.byteOffset, file.data.byteLength + file.data.byteOffset);
      console.log(arrayBuffer);
      const base64File = this.ConvertToBase64(arrayBuffer);
      console.log(base64File);
      return {
        uri: file.uri,
        base64File: `data:${file.mediaType};base64,` + base64File,
        resize:true,
        fileExtention: `.${file.mediaType.split('/')[1]}`,
      };
    } catch (error) {
      console.error(error);
    }
  }

  private ConvertToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  } 


  // ==============================================================================================
  // Browser Method
  // ==============================================================================================
  
  public RequestFileFromDevice(fileInput, mimeTypes: string): Promise<FileToUpload[]> {
    return new Promise((resolve, reject) => {
      try {
        fileInput.nativeElement.accept = mimeTypes;
        fileInput.nativeElement.onchange = (ev: MouseEvent) => {
          this.GetDeviceFiles(fileInput.nativeElement.files).then(image => resolve(image));
        };
        fileInput.nativeElement.click();
      } catch (error) {
        reject(error);
      } 
    });
  }


  private GetDeviceFiles(files: File[]): Promise<FileToUpload[]> {
    return new Promise((resolve, reject) => {
      const filesProcessed: FileToUpload[] = [];
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = readEvent => {
          const imageData = readEvent.target.result;
          const fileExtention = file.name.split('.').pop().toLowerCase();

          filesProcessed.push({
            base64File: String(imageData),
            fileExtention: '.' + fileExtention,
            resize: true,
          });

          if (filesProcessed.length == files.length) {
            resolve(filesProcessed);
          }
        };

        reader.readAsDataURL(file);
      }
    });
  }


  // ==============================================================================================
  // Permissions
  // ==============================================================================================
  
  private async CanReadExternalStorage() {
    if (!this.platform.is('android')) return true;

    try {
      let permsResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
      if (permsResult.hasPermission) {
        return true;
      } else {
        throw new Error('Permissions denied');
      }
    } catch (err) {
      let permsResult = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
      return !!permsResult.hasPermission;
    }
  }

  private async CanReadInternalStorage() {
    if (!this.platform.is('android')) return true;

    try {
      let permsResult = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_INTERNAL_STORAGE);
      if (permsResult.hasPermission) {
        return true;
      } else {
        throw new Error('Permissions denied');
      }
    } catch (err) {
      let permsResult = await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_INTERNAL_STORAGE);
      return !!permsResult.hasPermission;
    }
  }
}
