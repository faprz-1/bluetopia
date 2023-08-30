import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  modalRef: BsModalRef | null = null

  teachers: Array<any> = [];
  subjects: Array<any> = [];
  schoolId: number = 0;
  teacherToEdit: any = null;
  groupsInput: any = '';
  teacherForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    teacherGroups: new FormControl([], [Validators.required]),
    grade: new FormControl('', []),
    group: new FormControl('', []),
    subjects: new FormControl([], [Validators.required]),
    extracurricular: new FormControl(false, [Validators.required]),
  });

  constructor(
    private api: ApiService,
    public nav: NavigationService,
    private modalService: BsModalService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.schoolId = this.api.GetUser()?.schoolId;
    this.GetSubjects();
    this.GetSchoolTeachers();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  GetSubjects() {
    this.api.Get(`/Subjects`).subscribe(subjects => {
      this.subjects = subjects;
    }, err => {
      console.error("Error getting the subjects", err);
    });
  }

  GetSchoolTeachers() {
    this.api.Get(`/Teachers/OfSchool/${this.schoolId}`).subscribe(teachers => {
      this.teachers = teachers;
    }, err => {
      console.error("Error getting school teachers", err);
    });
  }

  EditTeacher(modalTemplate: any, teacher: any) {
    this.teacherForm.controls['id'].setValue(teacher.id);
    this.teacherForm.controls['name'].setValue(teacher.name);
    this.teacherForm.controls['email'].setValue(teacher.email);
    this.teacherForm.controls['subjects'].setValue(teacher.subjects);
    this.teacherForm.controls['extracurricular'].setValue(teacher.extracurricular);
    if(teacher.teacherGroups && teacher.teacherGroups.length) {
      let teacherGroups = teacher.teacherGroups.map((teacherGroup: any) => Object.assign({}, teacherGroup));
      this.teacherForm.controls['teacherGroups'].setValue(teacherGroups);
    }
    this.teacherForm.updateValueAndValidity();
    this.OpenModal(modalTemplate);
  }
  
  AddGroup() {
    const grade = this.teacherForm.controls['grade'].value;
    const group = this.teacherForm.controls['group'].value;
    let teacherGroups = this.teacherForm.controls['teacherGroups'].value;
    let teacherGroup = {
      grade,
      group
    }
    if(Array.isArray(teacherGroups)) teacherGroups.push(teacherGroup);
    else teacherGroups = [teacherGroup];
    
    this.teacherForm.controls['grade'].setValue('');
    this.teacherForm.controls['group'].setValue('');
    this.teacherForm.controls['teacherGroups'].setValue(teacherGroups);
    
    this.teacherForm.updateValueAndValidity();
  }
  
  DeleteGroup(idx: number) {
    let teacherGroups = this.teacherForm.controls['teacherGroups'].value;
    teacherGroups.splice(idx, 1);
  }
  
  SaveTeacher() {
    let teacherToSave = this.teacherForm.value;
    this.api.Patch(`/Teachers/${teacherToSave.id}`, {teacher: teacherToSave}).subscribe(teacherSaved => {
      this.CloseModal();
      this.toast.ShowSuccess(`Maestro actualizado correctamente`);
      this.GetSchoolTeachers();
    }, err => {
      console.error("Error saving teacher data", err);
    });
  }

}
