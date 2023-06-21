import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.scss']
})
export class StudentsDataComponent implements OnInit {

  user: any = null;
  grades: Array<any> = [];
  groups: Array<any> = [];
  gradeSelected: any = null;
  groupSelected: any = null;
  students: Array<any> = [];
  isEditing: boolean = false;

  constructor(
    public nav: NavigationService,
    private api: ApiService,
    private toast: ToastService,
    private role: RoleService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetGrades();
  }

  GetGrades() {
    this.api.Get(`/Grades`).subscribe(grades => {
      this.grades = grades;
      this.gradeSelected = !!this.grades.length ? this.grades[0] : null;
      this.GetGroups();
    }, err => {
      console.error("Error getting grades", err);
    });
  }
  
  GetGroups() {
    this.api.Get(`/Groups`).subscribe(groups => {
      this.groups = groups;
      this.groupSelected = !!this.groups.length ? this.groups[0] : null;
      this.GetStudents();
    }, err => {
      console.error("Error getting groups", err);
    });
  }

  GetStudents() {
    let endpoint = `/Students`;
    switch (this.user.role.name) {
      case 'School': endpoint += `/OfSchool/${this.user.id}`; break;
      case 'Teacher': endpoint += `/OfTeacher/${this.user.id}`; break;
      default: endpoint += `/OfSchool`; break;
    }
    endpoint += `/FilteredBy/Grade/${!!this.gradeSelected ? this.gradeSelected.id : 0}/Group/${!!this.groupSelected ? this.groupSelected.id : 0}`;
    this.api.Get(endpoint).subscribe(students => {
      this.students = students;
    }, err => {
      console.error("Error getting students", err);
    });
  }

}
