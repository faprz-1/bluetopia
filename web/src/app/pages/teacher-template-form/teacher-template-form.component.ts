import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-teacher-template-form',
  templateUrl: './teacher-template-form.component.html',
  styleUrls: ['./teacher-template-form.component.scss']
})
export class TeacherTemplateFormComponent implements OnInit {

  grade: any;
  group: any;
  templateId: any;
  strategyId: any;

  modalRef: BsModalRef | null = null;
  templateTopics: Array<any> = [];
  strategy: any = null;
  strategyForm: FormGroup = new FormGroup({
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
    productType: new FormControl(null, [Validators.required]),
    productName: new FormControl(null, [Validators.required]),
    productInstructions: new FormControl(null, [Validators.required]),
  });

  step: number = 1;

  public get nextButtonText() {
    switch (this.step) {
      case 1: return 'Crear productos parciales';
      case 2: return 'Crear productos finales';
      case 3: return 'Crear evento de cierre';
      case 4: return 'Finalizar';
      default: return 'Salir';
    }
  }

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }

  GoBack() {
    if(this.step == 1) this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}`);
    else this.step--;
  }

  NextStep(template: any) {
    if(this.step == 4) {
      this.OpenModal(template);
    }
    else this.step++;
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
      this.templateId = params['templateId'];
      this.strategyId = params['strategyId'];

      this.GetStrategy();
    });
  }

  InitializeStrategyForm(strategy: any) {
    this.strategyForm.get('topic')?.setValue(strategy.topic);
    this.strategyForm.get('title')?.setValue(strategy.title);
    this.strategyForm.get('generatingQuestion')?.setValue(strategy.generatingQuestion);

    this.strategyForm.updateValueAndValidity();
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      this.InitializeStrategyForm(strategy);
    }, err => {
      console.error("Error getting strategy", err);
    });
  }

  SaveStragey() {
    this.api.Patch(`/Strategies/${this.strategyId}`, {strategy: this.strategyForm.value}).subscribe(strategySaved => {
      this.InitializeStrategyForm(strategySaved);
    }, err => {
      console.error("Error updating strategy", err);
    });
  }

  CatchRubrics(rubrics: any) {
    console.log(rubrics);
  }

  SaveProject(exit: boolean = false) {
    this.CloseModal();
    if(exit) this.nav.GoToUserRoute('mis-estudiantes');
  }

  GoToProjectCalendar() {
    this.CloseModal();
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/estrategias/${this.strategyId}/calendario`);
  }

}
