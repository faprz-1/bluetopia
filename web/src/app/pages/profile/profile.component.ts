import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from '../../services/toast.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ready : boolean = true
  user : any
  mtModalRef: BsModalRef;
  isFormSended: boolean = false;
  isPromiseActive: boolean = false;
  userPasswords: any = {
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  }

  constructor(
    private sharedService : SharedService,
    private api : ApiService,
    private modalService: BsModalService,
    private toast: ToastService
    ) { }

  ngOnInit() {
    this.api.Get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
      localStorage.setItem("user", JSON.stringify(userFromServer));
      this.reload();
    })
  }

  reload() {
    this.ready = false;
    this.user = JSON.parse(localStorage.getItem("user"))
    this.ready = true;
  }

  openModal(template: TemplateRef<any>, event) {
    event.stopPropagation();
    this.mtModalRef = this.modalService.show(
      template, {
        backdrop: 'static'
      }
    );
  }

  CloseModal() {this.mtModalRef.hide();}

  ChangeUserPassword(){
    this.isFormSended = true;
    if(!this.IsPasswordFormValid() || this.isPromiseActive){
      return;
    }
    let postParams = {
      oldPassword: this.userPasswords.oldPassword,
      newPassword: this.userPasswords.newPassword
    }
    this.isPromiseActive = true;
    this.api.Post(`/Usuarios/change-password`, postParams).subscribe((passwordChanged: any) => {
      this.toast.ShowSuccess('Cotraseña actualizada correctamente');
      this.CloseModal();
      this.CleanForm();
      this.isPromiseActive = false;
    }, err => {
      this.toast.ShowError(`Error al actualizar la contraseña ${err.error.error.message}`);
      this.isPromiseActive = false;
    })
  }

  CleanForm(){
    for(const key in this.userPasswords){
      if(this.userPasswords.hasOwnProperty(key)){
        this.userPasswords[key] = "";
      }
    }
    this.isFormSended = false;
  }

  IsNewPasswordValid(newPassword: string){
    if(!newPassword) return false;
    if(newPassword.length < 3) return false;
    return true;
  }

  IsNewPassword2Valid(newPassword: string){
    if(!newPassword) return false;
    if(newPassword != this.userPasswords.newPassword) return 'no-match';
    return true;
  }

  IsPasswordFormValid(){
    let valid = true;
    if(!this.IsNewPassword2Valid(this.userPasswords.newPassword2) || this.IsNewPassword2Valid(this.userPasswords.newPassword2) == 'no-match'){
      valid = false;
    }
    if(!this.IsNewPasswordValid(this.userPasswords.newPassword)){
      valid = false;
    }
    if(!this.userPasswords.oldPassword.length){
      valid = false;
    }
    return valid;
  }

  ImageChanged(image){
    this.user.profileImage = image
    this.sharedService.userProfileImageUpdated$.emit(image)
  }
}
