import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  @Output() onBackClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNextClicked: EventEmitter<any> = new EventEmitter<any>();

  registerUid: any = null;
  studentGroups: Array<any> = [];
  credentialsForm: FormGroup = new FormGroup({
    studentId: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.registerUid = params['registerUid'];

      this.GetStudentGroups();
    });
  }

  GetStudentGroups() {
    this.api.Get(`/StudentsGroups/ByRegisterUid/${this.registerUid}`).subscribe(studentGroups => {
      this.studentGroups = studentGroups.filter((studentGroup: any) => !!studentGroup.student && !studentGroup.student.userId);
    }, err => {
      this.toast.ShowError(`Este link ya no es válido`);
      this.nav.GoTo('landing-page');
    });
  }

  BuildStudentFullName(student: any) {
    if(!student) return '';
    return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
  }

  RegisterStudent() {
    if(this.credentialsForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.credentialsForm.markAllAsTouched();
      return;
    }

    let user: any = this.credentialsForm.value;
    user.schoolId = this.studentGroups[0]?.student?.schoolId;
    this.onNextClicked.emit(user);
  }

}
