import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent implements OnInit {

  user: any = null;
  activeTab: string = 'profile';
  loading: any = {
    getting: false,
    updating: false
  }
  schoolUserForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    data: new FormGroup({
      id: new FormControl('', []),
      workTitle: new FormControl('', [Validators.required]),
      phone: new FormControl('', [ValidationService.CheckOnlyIntegerNumbers]),
      userId: new FormControl('', [Validators.required]),
    }),
    school: new FormGroup({
      id: new FormControl('', []),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, ValidationService.CheckOnlyIntegerNumbers]),
      address: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      isActive: new FormControl(false, []),
    }),
  });

   public get userDataForm() {
    return this.schoolUserForm.get('data') as FormGroup;
  }

  public get schoolForm(): FormGroup {
    return this.schoolUserForm.get('school') as FormGroup;
  }

    constructor(
    private api: ApiService,
    private toast: ToastService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetUSerData();
  }

SetForm() {
    this.schoolUserForm.setValue({
      id: this.user.school.id,
      name: this.user.school.name,
       email: this.user.email,
      data: {
        id: !!this.user.data ? this.user.data.id : null,
        workTitle: !!this.user.data ? this.user.data.workTitle : null,
        phone: !!this.user.data ? this.user.data.phone : null,
        userId: this.user.id,
      },
      school: {
        id: !!this.user?.school?.id ? this.user.school.id : null,
        name: !!this.user?.school?.name ? this.user.school.name : null,
        phone: !!this.user?.school?.phone ? this.user.school.phone : null,
        address: !!this.user?.school?.address ? this.user.school.address : null,
        isActive: !!this.user?.school?.isActive,
      },
    });
    
  }

 async GetUSerData() {
    await this.api.GetToken();
    this.api.Get(`/usuarios/withCredentials`).subscribe(user => {
      this.user = user;
      this.api.SetUser(user);
      this.SetForm();
    })
  }

   SaveUserData() {
    if (this.schoolUserForm.invalid) {
       this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
       this.schoolUserForm.markAllAsTouched();
       return;
     }
     this.loading.updating = true;
     this.api.Patch(`/Schools/${this.user.school.id}`, {school: this.schoolUserForm.value}).subscribe(saved => {
       this.toast.ShowSuccess(`Datos guardados correctamente`);
       this.GetUSerData();
       this.loading.updating = false;
     }, err => {
       console.error("Error saving user data", err);
       this.toast.ShowError(`Error al guardar los datos`);
       this.loading.updating = false;
     });
   }

 }
