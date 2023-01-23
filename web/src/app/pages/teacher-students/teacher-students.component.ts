import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.scss']
})
export class TeacherStudentsComponent implements OnInit {

  onStudentSearch: EventEmitter<any> = new EventEmitter<any>();

  students: Array<any> = [];
  teacherSubjects: Array<any> = [];
  teacherGroups: Array<any> = [];

  constructor(
    public nav: NavigationService,
    private api: ApiService,

  ) { }

  ngOnInit(): void {
    this.GetTeacherData();
    this.GetTeacherStudents();
  }

  GetTeacherStudents() {
    const user = this.api.GetUser();
    this.api.Get(`/Students/OfTeacher/${user ? user.id : 0}`).subscribe(students => {
      this.students = students;
      console.log(students);
    }, err => {
      console.error("Error getting the students of the teacher", err);
    });
  }
  
  GetTeacherData() {
    const user = this.api.GetUser();
    this.api.Get(`/Teachers/${user ? user.id : 0}/Data`).subscribe(teacher => {
      this.teacherSubjects = teacher.subjects;
      this.teacherGroups = teacher.teacherGroups;
    }, err => {
      console.error(`Error getting teacher data`, err);
    });
  }

  SearchStudent() {

  }

  CreateNewStrategy(groupStudents: any) {
    const group = groupStudents[0].group;
    const grade = groupStudents[0].grade;
    this.nav.GoToUserRoute(`grado/${grade}/grupo/${group}/plantillas`);
  }

}
