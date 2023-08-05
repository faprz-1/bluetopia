import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { StrategyDetailsModalComponent } from '../strategy-details-modal/strategy-details-modal.component';

@Component({
  selector: 'app-suggested-strategies-slider',
  templateUrl: './suggested-strategies-slider.component.html',
  styleUrls: ['./suggested-strategies-slider.component.scss']
})
export class SuggestedStrategiesSliderComponent implements OnInit {

  @Input() strategies: Array<any> = [];

  @ViewChild('strategyDetailsModal') strategyDetailsModal?: StrategyDetailsModalComponent;

  setStrategy: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  SeeStrategyDetails(strategy: any) {
    this.setStrategy.emit(strategy);
    this.strategyDetailsModal?.OpenModal();
  }

  // Slider controls
  currentIndex: number = 0;
  transform: number = 0;
  SlideTo(idx: number) {
    if(idx >= this.strategies.length) return;
    if(idx < 0) return;
    this.currentIndex = idx;
    this.transform = 100 * this.currentIndex;
  }

  GetArray(length: number): any[] {
    return Array(length).fill(0);
  }

}
