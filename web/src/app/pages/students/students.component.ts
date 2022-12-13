import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Array<any> = [];
  schoolUserId: number = 0;

  constructor(
    private api: ApiService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    const user = this.api.GetUser();
    this.schoolUserId = user.id;
    this.GetSchoolStudents();
  }

  GetSchoolStudents() {
    this.api.Get(`/Students/OfSchool/${this.schoolUserId}`).subscribe(students => {
      console.log(students);
      this.students = students;
    }, err => {
      console.error("Error getting the school students", err);
    });
  }

}
