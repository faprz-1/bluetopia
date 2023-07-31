import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-strategy-card',
  templateUrl: './strategy-card.component.html',
  styleUrls: ['./strategy-card.component.scss']
})
export class StrategyCardComponent implements OnInit {

  @Input() strategy: any = null

  @Output() onChange: EventEmitter<{type: 'delete' | 'update', data: any}> = new EventEmitter();

  @ViewChild('deleteStrategyModal') deleteStrategyModal?: ModalDirective;

  loading: any = {
    deleting: false
  }

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  DeleteStrategy() {
    this.loading.deleting = true;
    this.api.Delete(`/Strategies/${this.strategy.id}`).subscribe(deleted => {
      this.toast.ShowSuccess(`Estrategía eliminada`);
      this.loading.deleting = false;
      this.deleteStrategyModal?.hide();
      this.onChange.emit({
        type: 'delete',
        data: {strategyId: this.strategy.id}
      });
    }, err => {
      this.toast.ShowError(`Error al eliminar estrategía`)
      console.error("Error deleting strategy", err);
      this.loading.deleting = false;
    });
  }

}
