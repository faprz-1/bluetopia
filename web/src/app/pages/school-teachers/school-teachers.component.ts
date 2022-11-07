import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-school-teachers',
  templateUrl: './school-teachers.component.html',
  styleUrls: ['./school-teachers.component.scss']
})
export class SchoolTeachersComponent implements OnInit {

  subjects: Array<any> = [];
  teachers: Array<any> = [];
  teacherForm: FormGroup = new FormGroup({
    name: new FormControl('Teacher test', [Validators.required]),
    email: new FormControl('teacher@mailinator.com', [Validators.required, Validators.email]),
    grade: new FormControl('4', [Validators.required]),
    group: new FormControl('A', [Validators.required]),
    subjects: new FormControl([{id:1,name:"Español"},{id:7,name:"Matemáticas"}], [Validators.required]),
    extracurricular: new FormControl(false, [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetSubjects();
    this.ResetForm();
  }

  GetSubjects() {
    this.api.Get(`/Subjects`).subscribe(subjects => {
      this.subjects = subjects;
    }, err => {
      console.error("Error getting the subjects", err);
    });
  }

  AddTeacher() {
    if(this.teacherForm.invalid) {
      this.toast.ShowWarning('Llena todos los campos correctamente');
      return;
    }
    this.teachers.push(this.teacherForm.value);
    this.ResetForm();
  }

  DeleteTeacher(teacher: any) {
    const idx = this.teachers.findIndex(t => t.name == teacher.name && t.email == teacher.email);
    if(idx != -1) this.teachers.splice(idx, 1);
  }

  ResetForm() {
    this.teacherForm.reset();
    this.teacherForm.controls['extracurricular'].setValue(false);
    this.teacherForm.updateValueAndValidity();
  }

  SaveTeachers() {
    this.api.Post(`/Teachers/Array`, {teachers: this.teachers}).subscribe(newTeachers => {
      this.toast.ShowSuccess(`Maestros creados correctamente`);
    }, err => {
      console.error("Error at post teachers array", err);
    });
  }

}
