import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.scss']
})
export class TeacherStudentsComponent implements OnInit {

  onStudentSearch: EventEmitter<any> = new EventEmitter<any>();
  onChange: EventEmitter<any> = new EventEmitter<any>();

  students: Array<any> = [];
  teacherSubjects: Array<any> = [];
  teacherGroups: Array<any> = [];
  user: any = null;
  existedSchoolUser: boolean = false;

  public get schoolRegisterLink() {
    return `${this.api.GetHost()}registro/escuela/recomendado/${this.user ? this.user.id : 0}`;
  }

  constructor(
    public nav: NavigationService,
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
   if (this.user.school.schoolUserId != null) this.existedSchoolUser = true; 
    this.GetTeacherData();
    this.GetTeacherStudents();
  }

  GetTeacherStudents() {
    this.api.Get(`/Students/OfTeacher/${this.user ? this.user.id : 0}`).subscribe(students => {
      this.students = students;
      this.onChange.emit(this.students);
    }, err => {
      console.error("Error getting the students of the teacher", err);
    });
  }
  
  GetTeacherData() {
    this.api.Get(`/Teachers/${this.user ? this.user.id : 0}/Data`).subscribe(teacher => {
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

  CopyLinkToClipBoard() {
    navigator.clipboard.writeText(this.schoolRegisterLink);
    this.toast.ShowSuccess('Link copiado');
  }

}
