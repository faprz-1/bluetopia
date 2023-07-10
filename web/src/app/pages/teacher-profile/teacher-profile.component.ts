import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  user: any = null;
  activeTab: string = 'profile';
  loading: any = {
    getting: false,
    updating: false
  }
  teacherUserForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    data: new FormGroup({
      id: new FormControl('', []),
      schoolName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      schoolPhone: new FormControl('', [ValidationService.CheckOnlyIntegerNumbers]),
      workTitle: new FormControl('', [Validators.required]),
      phone: new FormControl('', [ValidationService.CheckOnlyIntegerNumbers]),
      userId: new FormControl('', [Validators.required]),
    }),
  });

  public get userDataForm() {
    return this.teacherUserForm.get('data') as FormGroup;
  }

  constructor(
    private api: ApiService,
    private toast: ToastService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.SetForm();
    this.GetTeacherGradesAndGroups();
  }

  SetForm() {
    this.teacherUserForm.setValue({
      id: this.user.teacher.id,
      name: this.user.teacher.name,
      email: this.user.teacher.email,
      data: {
        id: !!this.user.data ? this.user.data.id : null,
        schoolName: !!this.user.data ? this.user.data.schoolName : null,
        address: !!this.user.data ? this.user.data.address : null,
        schoolPhone: !!this.user.data ? this.user.data.schoolPhone : null,
        workTitle: !!this.user.data ? this.user.data.workTitle : null,
        phone: !!this.user.data ? this.user.data.phone : null,
        userId: this.user.id,
      },
    });
  }

  SaveUserData() {
    if (this.teacherUserForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.teacherUserForm.markAllAsTouched();
      return;
    }
    this.loading.updating = true;
    this.api.Patch(`/Teachers/${this.user.teacher.id}`, {teacher: this.teacherUserForm.value}).subscribe(saved => {
      this.toast.ShowSuccess(`Datos guardados correctamente`);
      this.user.data = this.teacherUserForm.value.data;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.loading.updating = false;
    }, err => {
      console.error("Error saving user data", err);
      this.toast.ShowError(`Error al guardar los datos`);
      this.loading.updating = false;
    });
  }

  // ----------------------- Teacher subjects ----------------------- //
  @ViewChild('addGradeAndGroupModal') addGradeAndGroupModal?: ModalDirective;

  grades: Array<any> = [];
  subjects: Array<any> = [];
  gradeOrGroupForm: FormGroup = new FormGroup({
    grade: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
  });

  GetTeacherGradesAndGroups() {
    this.api.Get(`/Teachers/${this.user.id}/Data`).subscribe(teacher => {
      this.grades = this.GroupByGrades(teacher.teacherGroups);
      this.subjects = teacher.subjects;
    }, err => {
      console.error("Error getting teacher groups", err);
    });
  }

  GroupByGrades(teacherGroups: any): Array<any> {
    let grades: Map<string, Array<any>> = new Map<string, Array<any>>();
    teacherGroups.forEach((teacherGroup: any) => {
      if(grades.has(`${teacherGroup.grade.id}~${teacherGroup.grade.name}`)) {
        grades.get(`${teacherGroup.grade.id}~${teacherGroup.grade.name}`)?.push(teacherGroup);
      } else grades.set(`${teacherGroup.grade.id}~${teacherGroup.grade.name}`, [teacherGroup]);
    });
    return Array.from(grades);
  }

  AddGradeAndGroup() {
    this.loading.creating = true;
    this.api.Post(`/Grades/GradeAndGroup`, {...this.gradeOrGroupForm.value, teacherId: this.user.teacher.id}).subscribe(newGrade => {
      this.toast.ShowSuccess(`Se ha agregado el grupo`);
      this.addGradeAndGroupModal?.hide();
      this.GetTeacherGradesAndGroups();
      this.loading.creating = false;
    }, err => {
      console.error("Error creating grade and group", err);
      this.toast.ShowError(`Error al agregar grupo`);
      this.loading.creating = false;
    })
  }

}
