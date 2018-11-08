import { Component, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EventsService } from 'angular4-events';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'template-profile-image-editor',
  templateUrl: './profile-image-editor.component.html',
  styleUrls: ['./profile-image-editor.component.scss']
})
export class ProfileImageEditorComponent implements OnInit {

  img:string;
  user : any
  processed : any = false
  processing : any = false
  newfile : any = ""
  success : any = false

  constructor(
    public toastr: ToastsManager, 
    private api: ApiService,
    private event:EventsService, 
    vcr: ViewContainerRef,
    private zone:NgZone
    ) { 
      this.user = JSON.parse(localStorage.getItem('user'))
    }
  
    ngOnInit() {
      console.log(this.user)
    }
    openFileBrowser(event:any){
      event.preventDefault();
  
      let e : HTMLElement = document.getElementById("base64ProfileImage") as HTMLElement;
      e.click();
    }
    
    
    onFileChange(event) {
      console.info("Cambiando archivo");
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        //  console.log(event.target.files[0]);
        reader.onload = (readEvent: any) => {
          var binaryString = readEvent.target.result;
  
          let file = {
            "encodedFileContainer": "profileImages",
            "name": event.target.files[0].name,
            "base64ProfileImage": btoa(binaryString),
            "base64ProfileImageExtention": "." + event.target.files[0].name.split('.').pop().toLowerCase()
          }
          this.newfile = file;
          this.updateProfile({"profileImage":this.newfile})
  
        };
  
        reader.readAsBinaryString(file);
      }
    }
  
    updateProfile(data) {
      this.success = false
      this.processed = false
      this.processing = true
  
      let endpoint = "/Usuario/" + this.user.id + "/changeProfileImage"
  
      this.api.post(endpoint, data, true).subscribe(
        (success : any) => {
          this.processing = false
          this.zone.run(()=>{
  
            this.user.profileImage = success.profileImage
            console.log(this.user.profileImage,success.profileImage)
          })
          localStorage.setItem("user", JSON.stringify(this.user) )
          this.event.publish("profileUpdate");
          this.processed = true
          this.success = true
        },
        (error : any) => {
          this.processing = false
  
  
          console.log( JSON.stringify(error))
  
          this.processed = true
          this.success = false
        }
      )
    }

}
