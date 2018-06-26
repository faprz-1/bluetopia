import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
//import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  constructor( 
    private router: Router, 
    public toastr: ToastsManager, 
    private api: ApiService,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  sexos: string[] = ['Hombre', 'Mujer'];
  img: string;
  image: File = null;
  users: Observable<any[]>;

  ngOnInit() {
  }

    onFileChange(event) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        this.image=<File>event.target.files[0];
        reader.onload = (readEvent: any) => {
          var binaryString = readEvent.target.result;
          this.img= btoa(binaryString);
        };
        reader.readAsBinaryString(file);
      }
  }

  clearFile() {
    this.img = null;
    this.fileInput.nativeElement.value = '';
  }


  createUser(user) {
    if ((user.password == user.password1)) {
      let userRequest = {
        user:{
          realm: user.nombres + user.apellidos,
          username: user.nombres,
          email: user.email,
          password: user.password
        },
        profileImage:{
          base64ProfileImage: this.img,
          base64ProfileImageExtention: "."+this.image.name.split('.')[1]
        }
      }
      this.api.post("/Usuarios/register",userRequest, false).subscribe(()=>{
        this.router.navigate(['/login']);
      })
      
    } else {
      this.showError();
    }
  }

  showError() {
    this.toastr.error('Las contraseñas no coinciden!', 'Error:');
  }
}
