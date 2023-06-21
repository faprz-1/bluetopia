import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
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

  @ViewChild('addGradeOrGroupModal') addGradeOrGroupModal?: ModalDirective;

  user: any = null;
  grades: Array<any> = [];
  groups: Array<any> = [];
  gradeSelected: any = null;
  groupSelected: any = null;
  students: Array<any> = [];
  isEditing: boolean = false;
  loading: any = {
    getting: false,
    creating: false,
  }
  gradeOrGroupForm: FormGroup = new FormGroup({
    grade: new FormControl('', []),
    group: new FormControl('', []),
  });

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
    this.loading.getting = true;
    this.api.Get(`/Grades`).subscribe(grades => {
      this.grades = grades;
      this.gradeSelected = !!this.grades.length ? this.grades[0] : null;
      this.GetGroups();
    }, err => {
      console.error("Error getting grades", err);
      this.loading.getting = false;
    });
  }
  
  GetGroups() {
    this.api.Get(`/Groups`).subscribe(groups => {
      this.groups = groups;
      this.groupSelected = !!this.groups.length ? this.groups[0] : null;
      this.GetStudents();
    }, err => {
      console.error("Error getting groups", err);
      this.loading.getting = false;
    });
  }

  GetStudents() {
    this.loading.getting = true;
    let endpoint = `/Students`;
    switch (this.user.role.name) {
      case 'School': endpoint += `/OfSchool/${this.user.id}`; break;
      case 'Teacher': endpoint += `/OfTeacher/${this.user.id}`; break;
      default: endpoint += `/OfSchool`; break;
    }
    endpoint += `/FilteredBy/Grade/${!!this.gradeSelected ? this.gradeSelected.id : 0}/Group/${!!this.groupSelected ? this.groupSelected.id : 0}`;
    this.api.Get(endpoint).subscribe(students => {
      this.students = students;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting students", err);
      this.loading.getting = false;
    });
  }

  AddGradeOrGroup() {
    this.loading.creating = true;
    this.api.Post(`/Grades/GradeOrGroup`, {...this.gradeOrGroupForm.value}).subscribe(newData => {
      this.toast.ShowSuccess(`Datos agregados`);
      this.addGradeOrGroupModal?.hide();
      this.gradeOrGroupForm.reset();
      this.GetGrades();
      this.loading.creating = false;
    }, err => {
      console.error("Error creating grade or group", err);
      this.loading.creating = false;
    });
  }

}
