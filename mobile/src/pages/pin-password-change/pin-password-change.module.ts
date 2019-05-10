import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PinPasswordChangePage } from './pin-password-change';

@NgModule({
  declarations: [
    PinPasswordChangePage,
  ],
  imports: [
    IonicPageModule.forChild(PinPasswordChangePage),
    TranslateModule.forChild()
  ],
  exports: [
    PinPasswordChangePage
  ]
})
export class PinPasswordChangePageModule { }
