import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.scss']
})
export class TeacherStudentsComponent implements OnInit {

  students: Array<any> = [];

  constructor(
    public nav: NavigationService,
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    this.GetTeacherStudents();
  }

  GetTeacherStudents() {
    const user = this.api.GetUser();
    this.api.Get(`/Students/OfTeacher/${user ? user.id : 0}`).subscribe(students => {
      this.students = students;
    }, err => {
      console.error("Error getting the students of the teacher", err);
    })
  }

  SearchStudent() {

  }

}
