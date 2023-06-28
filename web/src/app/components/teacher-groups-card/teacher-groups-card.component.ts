import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-teacher-groups-card',
  templateUrl: './teacher-groups-card.component.html',
  styleUrls: ['./teacher-groups-card.component.scss']
})
export class TeacherGroupsCardComponent implements OnInit {

  @Input() data: any = null;
  @Input() subjects: any = [];

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('editGroupsModal') editGroupsModal?: ModalDirective;

  user: any = null;
  grade: any = {};
  groups: Array<any> = [];
  teacherGroupForm: FormGroup = new FormGroup({
    teacherGroups: new FormControl([], [Validators.required]),
    group: new FormControl('', []),
  });

  constructor(
    private api: ApiService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    if(!!this.data && Array.isArray(this.data)) {
      this.grade.id = this.data[0].split('~')[0];
      this.grade.name = this.data[0].split('~')[1];
      this.groups = this.data[1].map((teacherGroup: any) => teacherGroup.group).sort((a: any, b: any) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;
        return 0;
      });
    }

    this.teacherGroupForm.get('teacherGroups')?.setValue(Array.from(this.data[1]));
  }

  SaveGroups() {
    console.log(this.teacherGroupForm);
    this.api.Patch(`/Grades/${this.grade.id}/UpdateGroups`, {teacherId: this.user.teacher.id, teacherGroups: this.teacherGroupForm.value.teacherGroups}).subscribe(updated => {
      this.editGroupsModal?.hide();
      this.onChange.emit();
    }, err => {
      console.error("Error updating teacher groups", err);
      this.toast.ShowError(`Error al actualizar grupos`);
    });
  }

  AddGroup() {
    const group = this.teacherGroupForm.controls['group'].value;
    let teacherGroups = this.teacherGroupForm.controls['teacherGroups'].value;
    let teacherGroup = {
      grade: this.grade.name,
      group
    }
    if(Array.isArray(teacherGroups)) teacherGroups.push(teacherGroup);
    else teacherGroups = [teacherGroup];
    
    this.teacherGroupForm.controls['group'].setValue('');
    this.teacherGroupForm.controls['teacherGroups'].setValue(teacherGroups);
    
    this.teacherGroupForm.updateValueAndValidity();
  }
  
  DeleteGroup(idx: number) {
    let teacherGroups = this.teacherGroupForm.controls['teacherGroups'].value;
    teacherGroups.splice(idx, 1);
  }

  ResetForm() {
    this.teacherGroupForm.reset();
    this.teacherGroupForm.get('teacherGroups')?.setValue(Array.from(this.data[1]));
  }

}
