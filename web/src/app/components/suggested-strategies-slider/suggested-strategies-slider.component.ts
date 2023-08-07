import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { StrategyDetailsModalComponent } from '../strategy-details-modal/strategy-details-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-suggested-strategies-slider',
  templateUrl: './suggested-strategies-slider.component.html',
  styleUrls: ['./suggested-strategies-slider.component.scss']
})
export class SuggestedStrategiesSliderComponent implements OnInit {

  @Input() strategies: Array<any> = [];
  @Input() templateId: any = null;

  @ViewChild('strategyDetailsModal') strategyDetailsModal?: StrategyDetailsModalComponent;

  setStrategy: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

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

  UseStrategy(strategy: any) {
    this.loading = true;
    this.api.Post(`/Strategies/${strategy.id}/Clone`, {}).subscribe(newStrategy => {
      this.toast.ShowSuccess(`Estrategia clonada correctamente`);
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
