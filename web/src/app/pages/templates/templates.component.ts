import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private toast: ToastService
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
    let route = `tipo-plantillas/${templateType.id}`;
    if(!!this.grade && !!this.group) route = `grado/${this.grade}/grupo/${this.group}/${route}`;
    this.nav.GoToUserRoute(route);
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
