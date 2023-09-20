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

  constructor(
    private api: ApiService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
  }

  GetStudentData() {
    this.api.Get(`/Usuarios/withCredentials`).subscribe(user => {
      this.api.SetUser(user);
      this.api.Get(`/Students/${user.student?.id}`).subscribe(student => {
      });
    }, err => {
      console.error("");
    });
  }

}
