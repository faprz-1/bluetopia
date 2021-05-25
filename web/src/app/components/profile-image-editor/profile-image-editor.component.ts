import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile-image-editor',
  templateUrl: './profile-image-editor.component.html',
  styleUrls: ['./profile-image-editor.component.scss']
})
export class ProfileImageEditorComponent {
  @Output() imageChanged = new EventEmitter<any>();

  img: string = '';
  user: any;
  processed: any = false;
  processing: any = false;
  newfile: any = '';
  success: any = false;

  constructor(
    public toast: ToastService,
    private api: ApiService,
    private zone: NgZone
  ) {
    this.user = this.api.GetUser();
  }

  openFileBrowser(event: any) {
    event.preventDefault();

    const e: HTMLElement = document.getElementById('base64File') as HTMLElement;
    e.click();
  }


  onFileChange(event: any) {
    const reader = new FileReader();
    if (event?.target?.files && event.target.files.length > 0) {
      const file = event?.target?.files[0];

      reader.onload = (readEvent: any) => {
        const binaryString = readEvent.target.result;

        const targetFile = event?.target?.files?.item(0);
        const file = {
          'encodedFileContainer': 'profileImages',
          'name': targetFile?.name,
          'resize': true,
          'base64File': btoa(binaryString),
          'fileExtention': '.' + targetFile?.name?.split('.')?.pop()?.toLowerCase()
        };
        this.newfile = file;
        this.UpdateProfile(this.newfile);
      };

      reader.readAsBinaryString(file);
    }
  }

  UpdateProfile(newImage: any) {
    this.success = false;
    this.processed = false;
    this.processing = true;

    const endpoint = `/Usuarios/${this.user.id}/changeProfileImage`;
    this.api.Post(endpoint, {newImage}, true).subscribe(
      (success: any) => {
        this.processing = false;
        this.zone.run(() => {
          this.user.profileImage = success.profileImage;
        });
        this.api.SetUser(this.user);
        this.processed = true;
        this.success = true;
        this.imageChanged.emit(success.profileImage);
        this.toast.ShowSuccess('Se ha actualizado la imagen de perfil');
      },
      (error: any) => {
        this.processing = false;
        this.processed = true;
        this.success = false;
        this.toast.ShowError('Error al actualizar la imagen de perfil');
      }
    );
  }
}
