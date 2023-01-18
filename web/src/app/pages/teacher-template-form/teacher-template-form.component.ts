import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

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
  parcialProductTypes: Array<any> = [];
  eventTypes: Array<any> = [];
  strategy: any = null;
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
  });
  parcialProductForm: FormGroup = new FormGroup({
    parcialProductTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, [Validators.required]),
  });
  eventForm: FormGroup = new FormGroup({
    eventTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, [Validators.required]),
  });

  step: number = 4;

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
    private modalService: BsModalService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.GetTemplateTopics();
    this.GetParcialProductTypes();
    this.GetEventTypes();
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
    this.Save();
    if(this.step == 4) this.OpenModal(template);
    else this.step++;
  }
  
  Save() {
    switch (this.step) {
      case 1: this.SaveStragey(); break;
      case 2: this.SaveParcialProduct(); break;
      case 3: this.SaveParcialProduct(true); break;
      case 4: this.SaveEvent(); break;
      default:
        break;
    }
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

  GetTemplateTopics() {
    this.api.Get(`/TemplateTopics`).subscribe(topics => {
      this.templateTopics = topics;
    }, err => {
      console.error("Erro getting template topics", err);
    });
  }

  GetParcialProductTypes() {
    this.api.Get(`/ParcialProductTypes`).subscribe(types => {
      this.parcialProductTypes = types;
    }, err => {
      console.error("Error getting parcial product types", err);
    });
  }

  GetEventTypes() {
    this.api.Get(`/EventTypes`).subscribe(types => {
      this.eventTypes = types;
    }, err => {
      console.error("Error getting event types", err);
    });
  }

  InitializeStrategyForm(strategy: any) {
    this.strategyForm.get('id')?.setValue(strategy.id);
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
    if(!this.strategyForm.valid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.strategyForm.markAllAsTouched();
      return;
    }

    this.api.Patch(`/Strategies/${this.strategyId}`, {strategy: this.strategyForm.value}).subscribe(strategySaved => {
      this.InitializeStrategyForm(strategySaved);
    }, err => {
      console.error("Error updating strategy", err);
    });
  }

  SaveParcialProduct(isParcialProductFinal: boolean = false) {
    if(!this.parcialProductForm.valid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.parcialProductForm.markAllAsTouched();
      return;
    }
    
    let parcialProductInstance = {
      ...this.parcialProductForm.value,
      isFinal: isParcialProductFinal,
      strategyId: this.strategyId,
    }
    
    this.api.Post(`/ParcialProducts`, {parcialProduct: parcialProductInstance}).subscribe(newParcialProduct => {
      this.strategy.parcialProducts.push(newParcialProduct);
      this.parcialProductForm.reset();
    }, err => {
      console.error("Error posting new parcial product", err);
    });
  }
  
  SaveEvent() {
    console.log(this.eventForm);
    if(!this.eventForm.valid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
      this.eventForm.markAllAsTouched();
      return;
    }

    let event = {
      ...this.eventForm.value,
      strategyId: this.strategyId
    }

    this.api.Post(`/Events`, {event}).subscribe(newEvent => {
    }, err => {
      console.error("Erro posting new event", err);
    })
  }

  CatchRubrics(rubric: any) {
    console.log(this.step);
    switch (this.step) {
      case 2: case 3:
        this.parcialProductForm.get('rubric')?.setValue(rubric);
        break;
      case 4:
        this.eventForm.get('rubric')?.setValue(rubric);
        break;
    }
  }

  SaveProject(exit: boolean = false) {
    this.CloseModal();
    // if(exit) this.nav.GoToUserRoute('mis-estudiantes');
  }

  GoToProjectCalendar() {
    this.CloseModal();
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/estrategias/${this.strategyId}/calendario`);
  }

}
