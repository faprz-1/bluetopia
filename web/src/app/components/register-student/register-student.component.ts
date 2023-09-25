import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

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
  masterKey = null;
  isPasswordShowing = false;
  saver = new Subject();
  isUsernameValid = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
    this.saver.pipe(debounceTime(100)).subscribe((data) => this.VerifyUsername());

  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.registerUid = params['registerUid'];

      this.GetStudentGroups();
    });
  }

  GetStudentGroups() {
    this.api.Get(`/StudentsGroups/ByRegisterUid/${this.registerUid}`).subscribe(studentGroupsInfo => {
      let studentGroups = studentGroupsInfo.studentGroups;
      this.masterKey = studentGroupsInfo.masterKey;
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

  AreCredentialsValid(){
    let password = this.credentialsForm.get('password')?.value;
    let user = this.credentialsForm.get('username')?.value;
    return password && this.masterKey!= null ? password == this.masterKey && user != null:password != null && user != null && this.isUsernameValid;
  }

  TogglePassword(){
    this.isPasswordShowing = !this.isPasswordShowing;
    var x: any = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  VerifyUsername(){
    let username =this.credentialsForm.get('username')?.value;
    this.api.Get(`/Usuarios/${username}/duplicated`).subscribe(isDuplicated => {
      if(isDuplicated) this.toast.ShowWarning("Ese nombre de usuario ya está registro, por favor intenta con otro");
      this.isUsernameValid = !isDuplicated;
    }, err => {
      this.isUsernameValid = false;
      this.toast.ShowError(`Error al consultar`);
    });
  }
}
