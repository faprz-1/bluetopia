import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-type-templates',
  templateUrl: './type-templates.component.html',
  styleUrls: ['./type-templates.component.scss']
})
export class TypeTemplatesComponent implements OnInit {

  modalRef: BsModalRef | null = null;
  templateType: any = null;
  selectedTemplate: any = null;
  grade: string | null = null;
  group: string | null = null;
  templateTypeId: number = 0;

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
      this.templateTypeId = params['templateTypeId'];
      this.GetTemplatesByType();
    });
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }
  
  GetTemplatesByType() {
    this.api.Get(`/TemplateTypes/${this.templateTypeId}/WithTemplates`).subscribe(templateTypes => {
      this.templateType = templateTypes;
    }, err => {
      console.error("Erro getting templates", err);
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas`);
  }

  CreateStrategyBasedOnTemplate(template: any) {
    
  }

}
