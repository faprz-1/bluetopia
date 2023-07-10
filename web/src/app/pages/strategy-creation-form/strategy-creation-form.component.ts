import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-strategy-creation-form',
  templateUrl: './strategy-creation-form.component.html',
  styleUrls: ['./strategy-creation-form.component.scss']
})
export class StrategyCreationFormComponent implements OnInit {

  template: any = null;
  selectedTemplate: any = null;
  templateId: number = 0;
  loading: any = {
    getting: true
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GoBack() {
    this.nav.GoToUserRoute(`plantillas/${this.templateId}`);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.templateId = params['templateId'];
      this.GetTemplate();
    });
  }

  GetTemplate() {
    this.api.Get(`/Templates/${this.templateId}`).subscribe(template => {
      this.template = template;
      this.loading.getting = false;
    }, err => {
      console.error("Erro getting templates", err);
      this.loading.getting = false;
    });
  }

}
