import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.scss']
})
export class EventDayComponent implements OnInit {

  grade: any;
  group: any;
  templateId: any;
  strategyId: any;
  eventDate: any;

  activities: Array<any> = [];

  public get formatedDate() {
    if(!this.eventDate) return '';
    return moment(this.eventDate).format('DD/MM/YY');
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
      this.templateId = params['templateId'];
      this.strategyId = params['strategyId'];
      this.eventDate = params['eventDate'];
    });
  }

  GoBack() {
    this.nav.GoToUserRoute('mis-estudiantes');
  }

}
