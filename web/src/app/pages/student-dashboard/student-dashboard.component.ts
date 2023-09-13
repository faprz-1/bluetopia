import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  popovers:any = {
    popoverCalfication: false,
    popoverLibrary: false,
    popoverFavorites: false,
    popoverCalendar: false,
  }

  constructor(
    private navigationService:NavigationService
  ) { }

  ngOnInit(): void {}

  OnMouseOver(type:string) { this.popovers[type] = true; }

  OnMouseOut(type:string) { this.popovers[type] = false; }

  GoToActivities() {
    this.navigationService.GoToUserRoute(`mis-actividades`);
  }
}
