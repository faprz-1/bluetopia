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
  schoolId: number = 0;

  constructor(
    private api: ApiService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.schoolId = this.api.GetUser()?.schoolId;
    this.GetSchoolStudents();
  }

  GetSchoolStudents() {
    this.api.Get(`/Students/OfSchool/${this.schoolId}`).subscribe(students => {
      this.students = students;
    }, err => {
      console.error("Error getting the school students", err);
    });
  }

  CreateNewStrategy(groupStudents: any) {
    const group = groupStudents[0].group;
    const grade = groupStudents[0].grade;
    this.nav.GoToUserRoute(`grado/${grade}/grupo/${group}/plantillas`);
  }

}
