import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GetFileService } from 'src/app/services/get-file.service';
import { ToastAlertService } from 'src/app/services/toast-alert.service';
import User from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: User;
  profileForm: FormGroup;
  profileImage: any;

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef<any>;

  get requiresPassword() {
    return this.profileForm.value.email != this.user.email;
  }

  get hasPassword() {
    return !this.requiresPassword || !!this.profileForm.value.password;
  }

  constructor(
    private api: ApiService,
    private userData: UserDataService,
    private getFile: GetFileService,
    private toastAlert: ToastAlertService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.Initialize();
  }

  async Initialize() {
    this.user = await this.api.GetUser();
    this.profileForm = new FormGroup({
      id: new FormControl(this.user.id, Validators.nullValidator),
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      phone: new FormControl(this.user.phone, Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])),
      password: new FormControl('', Validators.nullValidator),
    });
  }

  async GetProfileImage() {
    this.profileImage = (await this.getFile.GetImage(this.fileInput))[0];
  }
  
  public Save() {
    if (!this.profileForm.valid || !this.hasPassword) return;

    const profileData = this.ConsolidateData();
    this.api.Patch(`/Usuarios/${this.user.id}`, profileData).subscribe(
      (token) => this.OnSave(token),
      err => this.api.HandleAPIError(err), 
    );
  }

  public async OnSave(token: any) {
    this.toastAlert.ShowToast('Sus datos se han actualizado');
    if (token && token.id) {
      await this.userData.GetUserWithAPIToken(token);
    } else {
      await this.userData.RefreshUser();
    }
    this.router.navigate(['/profile']);
  }

  private ConsolidateData() {
    const profileData = this.profileForm.value;
    profileData.profileImage = this.profileImage;
    return profileData;
  }
}
