import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BsModalRef, BsModalService, idLocale } from 'ngx-bootstrap';

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

  constructor(
    private api : ApiService,
    private modalService: BsModalService
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

}
