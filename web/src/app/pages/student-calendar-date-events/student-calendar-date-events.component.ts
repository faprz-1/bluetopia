import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-calendar-date-events',
  templateUrl: './student-calendar-date-events.component.html',
  styleUrls: ['./student-calendar-date-events.component.scss']
})
export class StudentCalendarDateEventsComponent implements OnInit {

  date: any = null;

  strategy: any = null;
  selectedEvent: any = null;
  events: Array<any> = [];
  loading: boolean = true;
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Calendario', route: null},
    {name: 'Día', route: null},
  ];

  public get formatedDate() {
    if(!this.date) return '';
    return moment(this.date).tz(environment.timeZone).format('DD/MM/YY');
  }

  constructor(
    private api: ApiService,
    public nav: NavigationService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.date = params['date'];

      this.GetStudentEvents();
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`calendario`);
  }

  GetStudentEvents() {
    this.api.Get(`/Students/${this.api.GetUser()?.id}/Events`).subscribe(events => {
     this.events = events.filter((event: any) => event.date !== null && event.date.includes(this.date));
      this.loading = false;
    }, err => {
      console.error("Error getting student events", err);
      this.loading = false;
    });
  }

}
