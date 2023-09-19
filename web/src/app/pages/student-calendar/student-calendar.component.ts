import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventCalendarConfig } from 'src/app/shared/types';

@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.scss']
})
export class StudentCalendarComponent implements OnInit {

  loading: boolean = true;
  studentEvents: Array<any> = [];
  calendarConfig: EventCalendarConfig = {
    controlsAlign: 'center',
    mode: 'weekly'
  }
  crumbs: Array<any> = [
    { name: 'Volver al inicio', route: '/home' },
  ]

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetStudentEvents();
  }

  GetStudentEvents() {
    this.api.Get(`/Students/${this.api.GetUser()?.id}/Events`).subscribe(events => {
      this.studentEvents = events;
      this.loading = false;
    }, err => {
      console.error("Error getting student events", err);
      this.loading = false;
    });
  }

  GoToDateEvents(date: string) {
    this.nav.GoToUserRoute(`calendario/${date}/actividades`);
  }

}
