import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.scss']
})
export class EventDayComponent implements OnInit {

  @ViewChild('deleteEventConfirmationModal') deleteEventConfirmationModal?: ModalDirective;

  strategyId: any = null;
  date: any = null;

  strategy: any = null;
  selectedEvent: any = null;
  events: Array<any> = [];
  loading: any = {
    deleting: false
  };

  public get formatedDate() {
    if(!this.date) return '';
    return moment(this.date).tz(environment.timeZone).format('DD/MM/YY');
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private downloadService: DownloadFileService
  ) { }

  ngOnInit(): void {
    this.GetParams();
    this.ThatDayHasNotPassed();  
  }

 ThatDayHasNotPassed() {
    let selectedDate = moment(this.date).tz(environment.timeZone)
    let today = moment();
   if(selectedDate.isBefore(today, 'day') && !selectedDate.isSame(today, 'day')) return false;
   else return true;
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.date = params['date'];

      this.GetStrategy();
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario`);
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      if(!!strategy?.events?.length) {
        this.events = strategy.events.filter((event: any) => !!event.date && event.date.includes(moment(this.date).tz(environment.timeZone).format('YYYY-MM-DD')));
        this.SanitizeEvents();
      }
    }, err => {
      console.error("Error getting activities", err);
    });
  }

  RemoveFromArray(){
    let updatedEvents = this.events.filter (event=> event != this.selectedEvent);
    this.events = updatedEvents;
  }

  DeleteEvent() {
    this.loading.deleting = true;
    this.api.Delete(`/Events/${this.selectedEvent.id}`).subscribe(deleted => {
      this.deleteEventConfirmationModal?.hide();
      this.GetStrategy();
      this.RemoveFromArray();
      this.loading.deleting = false;
    }, err => {
      console.error("Error deleting event", err);
      this.toast.ShowSuccess(`Evento eliminado correctamente`);
      this.loading.deleting = false;
    });
  }

  GoToCreateEventOrProduct() {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}/crear`);
  }
  GoToCreateActivity() {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}/crear/actividad`);
  }

  SanitizeEvents(){
    this.events.forEach(event => {
      event.name = event.name ? event.name: event.parcialProduct.name;
      event.instructions = event.instructions ? event.instructions: event.parcialProduct.instructions;
      let parcialProductOfEvent = this.strategy.parcialProducts.filter((product:any)=>event.id == product.eventId);
      if(!parcialProductOfEvent || parcialProductOfEvent.length == 0) event.resources = [];
      else{
        event.resources = parcialProductOfEvent[0].resources;
      }
    });
    
  }

  DownloadFile(file:any){
    this.downloadService.Download(file.file.URL,file.file.name);
  }
}
