import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-student-activities',
  templateUrl: './student-activities.component.html',
  styleUrls: ['./student-activities.component.scss']
})
export class StudentActivitiesComponent implements OnInit {

  selectedFilter:number = 0;

  constructor(
    private navigationService:NavigationService
  ) { }

  ngOnInit(): void {
  }

  OnChangeSelectedFilter(filterNumber:number) {
    if(filterNumber != 0 && filterNumber != this.selectedFilter) this.selectedFilter = filterNumber;
    else if(filterNumber == this.selectedFilter) this.selectedFilter = 0;
  }

  GoToHome() {
    this.navigationService.GoToUserRoute(`home`);
  }

  GoToActivityDetails(activityId:number | null) {
    this.navigationService.GoToUserRoute(`mis-actividades/detalle-de-actividad/${activityId}`);
  }
}
