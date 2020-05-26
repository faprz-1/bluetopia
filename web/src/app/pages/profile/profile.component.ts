import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
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

  cards:any = [];

  listProducts = [
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 1",
      price: "1234",
      quantity: 1
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 2",
      price: "150.00",
      quantity: 3
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 3",
      price: 100.50,
      quantity: 10
    },
    {
      img: "../../../assets/img/avatar.jpg",
      name: "Product 4",
      price: 1000,
      quantity: 1
    }
  ]

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
    // this.getCards();
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

  getCards() {
    let endpoint = "/conekta/getCards";

    this.api.Post(endpoint,{cutomerId:this.user.customerId},true).subscribe(res => {
      this.cards = res;
    }, err => {
      console.log(err);
    });
  }

  deleteCard(card) {
    let enpoint = "/conekta/deleteCard";

    this.api.Post(enpoint,{cutomerId:this.user.customerId, cardId: card.id},true).subscribe( res => {
      this.reload();
    }, err => {
      this.toast.ShowError("Error al eliminar la tarjeta");
    });
  }

  checkAddCardInModal(val) {
    if(val == 1) { this.reload(); }
  }

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
