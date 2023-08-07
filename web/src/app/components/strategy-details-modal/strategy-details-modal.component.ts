import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-strategy-details-modal',
  templateUrl: './strategy-details-modal.component.html',
  styleUrls: ['./strategy-details-modal.component.scss']
})
export class StrategyDetailsModalComponent implements OnInit {

  @Input() setStrategy: EventEmitter<any> | null = null;
  @Input() templateId: any = null;

  @ViewChild('strategyDetailsModal') strategyDetailsModal?: ModalDirective;

  strategy: any = null;
  parcialProductFinal: any = null;
  finalEvent: any = null;
  subscriptions: Array<Subscription> = [];
  loading: boolean = false;
  dropdowns: any = {
    objectives: false,
    skills: false,
    finalProduct: false,
    finalEvent: false
  }

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    if(!!this.setStrategy) {
      this.subscriptions.push(this.setStrategy.subscribe(strategy => {
        this.strategy = strategy;
        this.SetParcialProductFinal();
        this.SetFinalEvent();
      }));
    }
  }

  ngOnDestroy() {
    while(this.subscriptions.length) this.subscriptions.pop()?.unsubscribe();
  }

  OpenModal() {
    this.strategyDetailsModal?.show();
  }

  GetArray(length: number): any[] {
    return Array(length).fill(0);
  }

  SetParcialProductFinal() {
    if(!!this.strategy?.parcialProducts?.length) {
      this.parcialProductFinal = this.strategy?.parcialProducts.find((product: any) => product.isFinal);
    }
  }

  SetFinalEvent() {
    if(!!this.strategy?.events?.length) {
      this.finalEvent = this.strategy?.events.find((event: any) => event.isFinal);
    }
  }

  ShowDropdowns() {
    for (const key in this.dropdowns) {
      if (Object.prototype.hasOwnProperty.call(this.dropdowns, key)) {
        this.dropdowns[key] = true;
      }
    }
    this.strategy.parcialProducts.forEach((product: any) => {
      product.dropdown = true;
    });
  }

  UseStrategy() {
    this.loading = true;
    this.api.Post(`/Strategies/${this.strategy.id}/Clone`, {}).subscribe(newStrategy => {
      this.toast.ShowSuccess(`Estrategia clonada correctamente`);
      this.strategyDetailsModal?.hide();
      let route = `plantillas/${this.templateId}/crear/${newStrategy.id}`;
      this.loading = false;
      this.nav.GoToUserRoute(route);
    }, err => {
      console.error("Error cloning strategy", err);
      this.toast.ShowError(`Error al clonar estartegía`);
      this.loading = false;
    });
  }

}
