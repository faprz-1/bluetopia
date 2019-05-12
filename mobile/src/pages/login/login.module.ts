import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';
import { SocialMediaComponent } from '../../components/social-media/social-media';

@NgModule({
  declarations: [
    LoginPage,
    SocialMediaComponent
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild(),
  ],
  exports: [
    LoginPage
  ]
})
export class LoginPageModule { }
