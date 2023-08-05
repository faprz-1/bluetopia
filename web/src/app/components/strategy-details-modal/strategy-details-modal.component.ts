import { Component, OnInit, Input, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-strategy-details-modal',
  templateUrl: './strategy-details-modal.component.html',
  styleUrls: ['./strategy-details-modal.component.scss']
})
export class StrategyDetailsModalComponent implements OnInit {

  @Input() setStrategy: EventEmitter<any> | null = null;

  @ViewChild('strategyDetailsModal') strategyDetailsModal?: ModalDirective;

  strategy: any = null;
  subscriptions: Array<Subscription> = [];

  constructor() { }

  ngOnInit(): void {
    if(!!this.setStrategy) {
      this.subscriptions.push(this.setStrategy.subscribe(strategy => {
        this.strategy = strategy;
        console.log(this.strategy);
      }));
    }
  }

  OpenModal() {
    this.strategyDetailsModal?.show();
  }

  GetArray(length: number): any[] {
    return Array(length).fill(0);
  }

}
