import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  modalRef: BsModalRef | null = null;
  templateTypes: Array<any> = [];
  selectedTemplate: any = null;
  grade: string | null = null;
  group: string | null = null;

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.GetTemplates();
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
    });
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  GetTemplates() {
    this.api.Get(`/TemplateTypes/WithTemplates`).subscribe(templateTypes => {
      this.templateTypes = templateTypes;
    }, err => {
      console.error("Erro getting templates", err);
    });
  }

  SeeAllTemplatesOfType(templateType: any) {
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/tipo-plantillas/${templateType.id}`);
  }
  
  CreateStrategyBasedOnTemplate(template: any) {
    this.CloseModal();
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${template.id}`);
  }

}
