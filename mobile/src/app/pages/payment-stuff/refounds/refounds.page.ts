import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

@Component({
  selector: 'app-refounds',
  templateUrl: './refounds.page.html',
  styleUrls: ['./refounds.page.scss'],
})
export class RefoundsPage extends ComponentBase implements OnInit {
  refounds:any = [];
  reasonsRefound:any=[
    {id:"requested_by_client",reason:"Peticion del cliente"},
    {id:"cannot_be_fulfilled",reason:"cannot_be_fulfilled"},
    {id:"duplicated_transaction",reason:"Transaccion duplicada"},
    {id:"suspected_fraud",reason:"Sospecha de fraude"},
    {id:"other",reason:"Otro"},
  ]
  reasonRefound:string = "";

  ngOnInit() { this.reload(); }

  async errorAlert(msn) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async succesAlert(msn) {
    const alert = await this.alertController.create({
      header: 'Correcto',
      subHeader: '',
      message: msn,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  reload() { this.getRefunds(); }

  getRefunds() {
    let endpoint = "/ordersHistories/getOrdHist";

    this.api.get(endpoint).subscribe( res => {
      this.refounds = res;

      this.refounds.forEach(r => { r.change = false; });
    }, err => {
      this.errorAlert("No se pudo obetener el listado de devoluciones");
    });
  }

  processRefound(refoundObj) {
    let enpoint = "/Conekta/refoundOrder";

    if(this.reasonRefound == "") {
      this.errorAlert("No se pudo hacer la devolucion, por que no se agrego una razón");
      refoundObj.change = !refoundObj.change;
    } else {

      let objRefound = { reason: this.reasonRefound }

      this.api.post(enpoint, {orderId:refoundObj.orderId, objRefound:objRefound, orderH:refoundObj}, ).subscribe(res => {
        refoundObj.change = !refoundObj.change;
        this.succesAlert("El reembolso se a realizado correctamente");
        this.reload();
      }, err => { this.errorAlert(err.error.error.details[0].message); });
    }
  }

  converPrice(price) {
    let priceLength = price.length;
    let pricePart1 = price.slice(0,priceLength-2);
    let pricePart2 = price.slice(priceLength-2,priceLength);

    return parseInt(pricePart1+'.'+pricePart2);
  }

}
