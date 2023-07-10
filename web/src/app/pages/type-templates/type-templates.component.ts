import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private activatedRoute: ActivatedRoute,
    private toast: ToastService
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
    let route = `plantillas`;
    if(!!this.grade && !!this.group) route = `grado/${this.grade}/grupo/${this.group}/${route}`;
    this.nav.GoToUserRoute(route);
  }

  OnTemplateSelected(template: any) {
    this.selectedTemplate = template;
    this.nav.GoToUserRoute(`plantillas/${template.id}`);
  }

  CreateStrategyBasedOnTemplate(template: any) {
    this.CloseModal();
    let strategy = {
      templateId: template.id,
      userId: this.api.GetUser()?.id,
      grade: !!this.grade ? this.grade : null,
      group: !!this.group ? this.group : null,
    }
    this.api.Post(`/Strategies`, {strategy}).subscribe(newStrategy => {
      let route = `estrategias/${newStrategy.id}/materias`;
      this.nav.GoToUserRoute(route);
    }, err => {
      console.error("Error creating strategy", err);
      this.toast.ShowError(`Error al crear la estrategia`);
    });
  }

}
