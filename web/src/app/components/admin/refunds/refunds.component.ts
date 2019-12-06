import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { ApiService } from '../../../services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {
  
  mtModalRef: BsModalRef;

  refounds:any = [];

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private modalService: BsModalService
  ) { }

  ngOnInit() { this.reload(); }

  openModal(template: TemplateRef<any>, event) {
    event.stopPropagation();
    this.mtModalRef = this.modalService.show(
      template, {
        backdrop: 'static'
      }
    );
  }

  closeModal() {this.mtModalRef.hide();}

  reload() { this.getRefunds(); }

  getRefunds() {
    let endpoint = "/ordersHistories/getOrdHist";

    this.api.get(endpoint).subscribe( res => {
      this.refounds = res;
      console.log(this.refounds);
      
    }, err => {
      this.toast.showError("No se pudo obetener el listado de devoluciones");
    });
  }
}
