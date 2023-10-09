import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  user: any;
  crumbs: Array<any> = [
    {name: 'Volver al inicio', route: '/home'}
  ]
  student: any;
  canEdit: boolean = false;

  constructor(
    private api: ApiService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetStudentData();
  }

  GetStudentData() {
    this.api.Get(`/Usuarios/withCredentials`).subscribe(user => {
      this.api.SetUser(user);
      this.api.Get(`/Students/GetStudentByUser`, {userId: user.id}).subscribe(student => {
      this.student = student;
      });
    }, err => {
      console.error("");
    });
  }

  async EditPromise() {
    delete this.student.studentGroup
    await  this.api.Post(`/Students/${this.student.id}/save`, {newStudent: this.student}).subscribe(student => {
    this.student = student;
  }, err => {
    console.error("");
  });
  this.canEdit = false;
}

}
