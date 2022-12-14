import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  teachers: Array<any> = [];
  schoolUserId: number = 0;

  constructor(
    private api: ApiService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    const user = this.api.GetUser();
    this.schoolUserId = user.id;
    this.GetSchoolTeachers();
  }

  GetSchoolTeachers() {
    this.api.Get(`/Teachers/OfSchool/${this.schoolUserId}`).subscribe(teachers => {
      this.teachers = teachers;
    }, err => {
      console.error("Error getting school teachers", err);
    })
  }

}
