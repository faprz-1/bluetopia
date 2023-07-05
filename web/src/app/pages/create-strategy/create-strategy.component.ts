import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-strategy',
  templateUrl: './create-strategy.component.html',
  styleUrls: ['./create-strategy.component.scss']
})
export class CreateStrategyComponent implements OnInit {

  modalRef: BsModalRef | null = null;
  template: any = null;
  selectedTemplate: any = null;
  templateId: number = 0;
  loading: any = {
    getting: true
  }

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
      this.templateId = params['templateId'];
      this.GetTemplate();
    });
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
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

  GoBack() {
    let route = `plantillas`;
    this.nav.GoToUserRoute(route);
  }

  CreateStrategyBasedOnTemplate(template: any) {
    this.CloseModal();
    let strategy = {
      templateId: template.id,
      userId: this.api.GetUser()?.id,
      grade: null,
      group: null,
    }
    this.api.Post(`/Strategies`, {strategy}).subscribe(newStrategy => {
      let route = `estrategias/${newStrategy.id}/materias`;
      this.nav.GoToUserRoute(route);
    }, err => {
      console.error("Error creating strategy", err);
      this.toast.ShowError(`Error al crear la estrategia`);
    });
  }

  GetArray(length: number): any[] {
    return Array(length).fill(0);
  }

}
