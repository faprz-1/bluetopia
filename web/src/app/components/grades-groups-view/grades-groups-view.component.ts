import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-grades-groups-view',
  templateUrl: './grades-groups-view.component.html',
  styleUrls: ['./grades-groups-view.component.scss'],
})
export class GradesGroupsViewComponent implements OnInit, OnDestroy {
  @Input() students: Array<any> = [];
  @Input() adminControls: boolean = false;
  @Input() teacherControls: boolean = false;
  @Input() newDashboard: boolean = false;
  @Input() onStudentSearch: EventEmitter<any> | null = null;
  @Input() onChange: EventEmitter<any> | null = null;

  @Output() onAddGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddGrade: EventEmitter<any> = new EventEmitter<any>();
  @Output() onApplyExistentStrategy: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() onCreateNewStrategy: EventEmitter<any> = new EventEmitter<any>();
  @Output() onReload: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('addStudentModal') addStudentModal?: ModalDirective;
  @ViewChild('passwordModal') passwordModal?: ModalDirective;

  grades: Array<any> = [];
  selectedGrade: any = null;
  selectedGroup: any = null;
  strategiesStatuses: Array<any> = [];
  loading: any = {
    generatingLink: null,
  };

  subscriptions: Array<Subscription | undefined> = [];

  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fatherLastname: new FormControl('', [Validators.required]),
    motherLastname: new FormControl('', []),
    registerNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      ),
    ]),
    grade: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    schoolId: new FormControl('', []),
    teacherUserId: new FormControl('', []),
  });
  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', []),
    newPassword: new FormControl('', [Validators.required,Validators.minLength(3)]),
    confirmation: new FormControl('', [Validators.required,Validators.minLength(3)]),
  });
  popovers: any = {
    popoverPassword: false,
    popoverLink: false,
  };

  showPassword: any = {
    current: false,
    new: false,
    confirmation: false,
  };
  user:any;
  teacherGroups:any;
  constructor(private api: ApiService, private toast: ToastService) {
    this.user = this.api.GetUser();
    this.GetTeacherData();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.onStudentSearch?.subscribe((student) => {}));
    this.subscriptions.push(
      this.onChange?.subscribe((students) => {
        this.students = students;
        this.GetTeacherData();
      })
    );
  }

  ngOnDestroy() {
    while (this.subscriptions.length) this.subscriptions.pop()?.unsubscribe();
  }

  FormatStudents() {
    this.students = this.students.map((student) => {
      if (student.hasOwnProperty('studentGroup')) {
        student.group = !!student.studentGroup.group
          ? student.studentGroup.group.name
          : 'sin grupo';
        student.grade = !!student.studentGroup.grade
          ? student.studentGroup.grade.name
          : 'sin grado';
      }
      return student;
    });
    this.GroupStudents();
  }

  GroupStudents() {
    let grades: any = {};
    this.grades = [];
    this.students.forEach((student) => {
      if (grades[student.grade]) grades[student.grade].push(student);
      else grades[student.grade] = [student];
    });

    for (const key in grades) {
      let groups: any = {};
      if (Object.prototype.hasOwnProperty.call(grades, key)) {
        const studentsOfGrade = grades[key];
        studentsOfGrade.forEach((student: any) => {
          student = this.SetMasterKey(student);
          if (groups[student.group]) groups[student.group].push(student);
          else groups[student.group] = [student];
        });
        this.grades.push({
          key,
          groups: this.ObjectToArray(groups),
        });
      }
    }

    this.grades.sort((a: any, b: any) => {
      if (a.key > b.key) return 1;
      if (a.key < b.key) return -1;
      return 0;
    });
    if (this.grades.length > 0) this.selectedGrade = this.grades[0];
  }

  ObjectToArray(object: any) {
    let array = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element: any = object[key];
        array.push(element);
      }
    }
    return array;
  }

  GetTeacherData() {
    this.api.Get(`/Teachers/${this.user ? this.user.id : 0}/Data`).subscribe(teacher => {
      this.teacherGroups = teacher?.teacherGroups || [];
      this.FormatStudents();

    }, err => {
      console.error(`Error getting teacher data`, err);
    });
  }

  SetMasterKey(student: any){
    if(this.teacherGroups.length == 0 || !student.studentGroup) return student;
    let matchingGroup = this.teacherGroups.filter((group:any)=> group.groupId == student.studentGroup.groupId && group.gradeId == student.studentGroup.gradeId);
    if(matchingGroup.length == 0) return student;
    student.masterKey = matchingGroup[0].masterKey;
    return student;
  }


  SelectGrade(grade: any) {
    this.selectedGrade = grade;
    this.passwordForm.get('newPassword')?.setValue(grade.masterKey);
  }

  AddGrade() {}

  SetStudentFormRelations(student: any) {
    this.studentForm.get('grade')?.setValue(student.grade);
    this.studentForm.get('group')?.setValue(student.group);
    this.studentForm.get('schoolId')?.setValue(student.schoolId);
    this.studentForm.get('teacherUserId')?.setValue(student.teacherUserId);
  }

  AddStudent() {
    this.studentForm.value.teacherUserId = this.studentForm.value.teacherUserId ? this.studentForm.value.teacherUserId : null;
    if (this.studentForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar los campos obligatorios`);
      this.studentForm.markAllAsTouched();
      return;
    }

    this.api.Post(`/Students`, { student: this.studentForm.value }).subscribe(
      (newStudent) => {
        this.toast.ShowSuccess(`Estudiante agregado con exito`);
        this.addStudentModal?.hide();
        this.onReload.emit();
      },
      (err) => {
        console.error('Error creating a student', err);
        this.toast.ShowError(`Error al crear estudiante`);
      }
    );
  }

  GenerateAndCopyLink(studentGroup: any) {
    let params: any = {
      schoolId: this.api.GetUser().schoolId,
      gradeId: studentGroup?.gradeId,
      groupId: studentGroup?.groupId,
    };
    this.api.Patch(`/StudentsGroups/RegisterUid`, params).subscribe(
      (registerUid) => {
        navigator.clipboard.writeText(
          `${this.api.GetHost()}registro/estudiante/${registerUid}`
        );
        this.toast.ShowSuccess(`Link copiado al portapapeles`);
      },
      (err) => {
        this.toast.ShowError(`Error al generar link`);
      }
    );
    this.selectedGroup = null;
  }

  OnMouseOver(type: string, index: any) {
    this.selectedGroup = index;    
    this.passwordForm.get('currentPassword')?.setValue(index.masterKey);
    this.popovers[type] = true;
  }

  OnMouseOut(type: string) {
    this.popovers[type] = false;
  }

  TogglePassword(id: any) {
    this.showPassword[id] = !this.showPassword[id];
    var x: any = document.getElementById(id);
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  IsNewPasswordValid(){
    let newPassword = this.passwordForm.get('newPassword')?.value;
    let confirmation= this.passwordForm.get('confirmation')?.value;
    if(newPassword != confirmation) {
      this.toast.ShowWarning("Las contraseñas no coinciden");}
    return newPassword === confirmation;
  }

  SaveGroupPassword(){
    if(!this.IsNewPasswordValid()) return;
    var newPassword = {
      new: this.passwordForm.get('newPassword')?.value,
      confirmation: this.passwordForm.get('confirmation')?.value,
      groupId: this.selectedGroup.studentGroup.groupId,
      gradeId: this.selectedGroup.studentGroup.gradeId,
      teacherId:this.user.teacher ? this.user.teacher.id : null,
      schoolId: this.user.schoolId
    }
    this.loading.password = true;
    this.api.Post('/TeacherGroups/setKey',newPassword,true).subscribe((result)=>{
      this.CleanPasswordForm();
      this.passwordForm.get('currentPassword')?.setValue(newPassword.new);
      this.toast.ShowSuccess(`Contraseña creada`);
      this.loading.password = false;
      this.passwordModal?.hide();
      this.GetTeacherData();
    },
    (err) => {
      this.loading.password = false;
      this.toast.ShowError(`Error al guardar contraseña`);
    });
  }
  
  CleanPasswordForm(){
    this.selectedGroup = null;
    this.passwordForm.get('newPassword')?.setValue('');
    this.passwordForm.get('confirmation')?.setValue('');
  }
}
