import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { EmailVerificationComponent } from "./email-verification.component";
import { NotificationService } from '../../services/notification.service';
import { SocketService } from '../../services/socket.service';
import { ToastrModule } from 'ngx-toastr';

const MODULE_ROUTES = [
  { path: '', component: EmailVerificationComponent }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, TooltipModule,
    RouterModule.forChild(MODULE_ROUTES),
    ToastrModule.forRoot(),
  ]
  ,
  declarations: [
    EmailVerificationComponent,
  ]
  , providers: [
    NotificationService,
    SocketService
  ]
})
export class EmailVerificationModule { }
