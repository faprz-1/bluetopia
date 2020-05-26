import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

import * as moment from 'moment';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  verified: boolean  = false;
  loading: boolean  = true;

  constructor(
    public toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.VerifyEmail();
  }

  VerifyEmail() {
    this.route.params.subscribe(params => {
      let code = params['code'];
      this.api.Patch('/Usuarios/verify/' + code, {}, false).subscribe((success: any[]) => {
        this.verified = true;
        this.loading = false;
      }, err => {
        this.verified = false;
        this.loading = false;
        // this.toast.showError('Ocurrió un error');
      });
    });
  };

}
