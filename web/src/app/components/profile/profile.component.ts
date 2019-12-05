import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BsModalRef, BsModalService, idLocale } from 'ngx-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ready : boolean = true
  user : any
  mtModalRef: BsModalRef;

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
      quantity: 10
    }
  ]

  constructor(
    private api : ApiService,
    private modalService: BsModalService,
    private toast: ToastService
    ) { }

  ngOnInit() {
    this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{  
      localStorage.setItem("user", JSON.stringify(userFromServer))
      this.reload();
    })
  }

  reload() {
    this.ready = false;
    this.user = JSON.parse(localStorage.getItem("user"))
    this.getCards();
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

  closeModal() {this.mtModalRef.hide();}

  getCards() {
    let endpoint = "/conekta/getCards";

    this.api.post(endpoint,{cutomerId:this.user.customerId},true).subscribe(res => {
      this.cards = res;
    }, err => {
      console.log(err);
    });
  }

  deleteCard(card) {
    let enpoint = "/conekta/deleteCard";

    this.api.post(enpoint,{cutomerId:this.user.customerId, cardId: card.id},true).subscribe( res => {
      this.reload();
    }, err => {
      this.toast.showError("Error al eliminar la tarjeta");
    });
  }

  checkAddCardInModal(val) {
    if(val == 1) { this.reload(); }
  }

}
