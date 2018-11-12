import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'template-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss'],
  providers : [
    { provide : NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FileChooserComponent), multi: true}
  ]
})
export class FileChooserComponent implements ControlValueAccessor, OnInit {
  
  @Input('endpoint') fileUploadEndpoint : string
  @Input('filter') extensionFilter : string
  @Input('category') fileType : string

  base64File : any
  uploadedFile : any
  imageURL : string
  fileData : any

  isProcessing : boolean = false
  isSuccess : boolean = false

  _onChange : any
  _onTouched : any

  constructor(private api : ApiService) { 
  }

  ngOnInit() {
    console.log("Endpoint", this.fileUploadEndpoint)
    console.log("filter", this.extensionFilter)
    console.log("category", this.fileType)
  }

  writeValue(obj : any) {
    this.uploadedFile = obj
    this.imageURL = this.api.baseURL + this.uploadedFile.URL
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = this.onFileChange;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  onFileChange(event) {
		let reader = new FileReader();
		if(event.target.files && event.target.files.length > 0) {
			let file = event.target.files[0];

			reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        
        this.fileData = {
          "fileType" : this.fileType,
          "file" : {
            "base64File" : btoa(binaryString),
            "fileExtention" : "." + event.target.files[0].name.split('.').pop().toLowerCase()
          }
        }

        if(this.fileUploadEndpoint == null)
          return 

        this.isProcessing = false
        this.isSuccess = false

        this.api.post(this.fileUploadEndpoint, this.fileData, true).subscribe(
          (valid : any) => {
            this.isProcessing = true
            this.isSuccess = true

            this.uploadedFile = valid
            this.imageURL = this.api.baseURL + this.uploadedFile.URL

            console.log("Valid:", valid)
          },
          (invalid : any) => {
            this.isProcessing = true
            this.isSuccess = false
            console.error("Invalid:", invalid)
          }
        )
			};

			reader.readAsBinaryString(file);
		}
  }

}
