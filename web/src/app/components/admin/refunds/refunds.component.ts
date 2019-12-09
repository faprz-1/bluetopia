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

  reasonRefound:string = "";

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private modalService: BsModalService
  ) { }

  ngOnInit() { this.reload(); }

  openModal(template: TemplateRef<any>, event) {
    event.stopPropagation();
    this.mtModalRef = this.modalService.show(
      template, { backdrop: 'static' }
    );
  }

  closeModal() {this.mtModalRef.hide();}

  reload() { this.getRefunds(); }

  getRefunds() {
    let endpoint = "/ordersHistories/getOrdHist";

    this.api.get(endpoint).subscribe( res => {
      this.refounds = res;

      this.refounds.forEach(r => { r.change = false; });
    }, err => {
      this.toast.showError("No se pudo obetener el listado de devoluciones");
    });
  }

  refound(refoundObj) {
    let enpoint = "/conekta/refoundOrder";

    if(this.reasonRefound == "") {
      this.toast.showError("No se pudo hacer la devolucion, por que no se agrego una razón");
      refoundObj.change = !refoundObj.change;
    } else {

      let objRefound = { reason: this.reasonRefound }

      this.api.post(enpoint, {orderId:refoundObj.orderId, objRefound:objRefound, orderH:refoundObj}, ).subscribe(res => {
        refoundObj.change = !refoundObj.change;
        this.toast.showSuccess("El reembolso se a realizado correctamente");
        this.reload();
      }, err => { this.toast.showError(err.error.error.details[0].message); });
    }
  }

  converPrice(price) {
    let priceLength = price.length;
    let pricePart1 = price.slice(0,priceLength-2);
    let pricePart2 = price.slice(priceLength-2,priceLength);

    return parseInt(pricePart1+'.'+pricePart2);
  }
}
