import { Component, OnInit, ViewContainerRef, NgZone, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'template-profile-image-editor',
  templateUrl: './profile-image-editor.component.html',
  styleUrls: ['./profile-image-editor.component.scss']
})
export class ProfileImageEditorComponent implements OnInit {
  @Output() imageChanged = new EventEmitter<any>();

  img: string;
  user: any;
  processed: any = false;
  processing: any = false;
  newfile: any = '';
  success: any = false;

  constructor(
    public toastr: ToastrService,
    private api: ApiService,
    vcr: ViewContainerRef,
    private zone: NgZone
    ) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    ngOnInit() {
      console.log(this.user);
    }
    openFileBrowser(event: any){
      event.preventDefault();

      const e: HTMLElement = document.getElementById('base64ProfileImage') as HTMLElement;
      e.click();
    }


    onFileChange(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        reader.onload = (readEvent: any) => {
          const binaryString = readEvent.target.result;

          const file = {
            'encodedFileContainer': 'profileImages',
            'name': event.target.files[0].name,
            'resize': true,
            'base64File': btoa(binaryString),
            'fileExtention': '.' + event.target.files[0].name.split('.').pop().toLowerCase()
          };
          this.newfile = file;
          this.UpdateProfile(this.newfile);
        };

        reader.readAsBinaryString(file);
      }
    }

    UpdateProfile(data) {
      this.success = false;
      this.processed = false;
      this.processing = true;

      const endpoint = '/Usuarios/' + this.user.id + '/changeProfileImage';

      this.api.Post(endpoint, { newImage: data }, true).subscribe(
        (success: any) => {
          this.processing = false;
          this.zone.run(() => {
            this.user.profileImage = success.profileImage;
          });
          localStorage.setItem('user', JSON.stringify(this.user) );
          this.processed = true;
          this.success = true;
          this.imageChanged.emit(success.profileImage);
        },
        (error: any) => {
          this.processing = false;


          console.log( JSON.stringify(error));

          this.processed = true;
          this.success = false;
        }
      );
    }

}
