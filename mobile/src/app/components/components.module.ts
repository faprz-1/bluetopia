import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SocialMediaLoginButtonsComponent } from './social-media-login-buttons/social-media-login-buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  declarations: [SocialMediaLoginButtonsComponent],
  exports: [SocialMediaLoginButtonsComponent],
  providers: [
    Storage,
    Facebook,
    GooglePlus
  ]
})
export class ComponentsModule {}
