import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FileChooserComponent {
  @Input() notPreview: boolean = false
  @Input() resize: boolean = false
  @Input() title: string = ""
  @Input()
  fileType!: string;
  @Input()
  extensionFilter!: string;
  @Output('onChange') onChange = new EventEmitter<any>()

  @Input('placeholder')
  placeholderUrl!: string;
  @Input('imageUrl')
  imageUrl!: string;
  @Input('imageHeight') imageHeight: number = 500;
  @Input('disabled') disabled: boolean = false;
  @Input('isImage') isImage: boolean = false;

  public fileData: any;
  public loading!: boolean;


  public get callToAction() {
    let prefix = this.fileData ? `Cambiar` : `Elegir`;
    let suffix = this.isImage ? `imagen` : `archivo`;

    return `${prefix} ${suffix}`;
  }

  constructor() {
    this.fileData = null;
  }

  onFileChange(event: any) {
    this.loading = true;
    const reader = new FileReader();
    if (event.target.files != null && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;

        this.fileData = {
          "encodedFileContainer": this.fileType,
          "base64File": btoa(binaryString),
          "name": file.name,
          "resize": this.resize,
          "fileExtention": "." + file?.name?.split('.')?.pop()?.toLowerCase()
        }
        this.imageUrl = 'data:image/' + this.fileData.fileExtention.split('.')[1] + ';base64,' + this.fileData.base64File;
        this.loading = false;
        this.onChange.emit(this.fileData);
      };
      reader.readAsBinaryString(file);
    }
    else {
      this.loading = false;
    }
  }

  clear() {
    this.fileData = null;
  }

}
