import { Component, EventEmitter, OnInit } from '@angular/core';
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

  NEW_TOPIC_NAME: string = 'Agregar uno nuevo';

  grade: any;
  group: any;
  templateId: any;
  strategyId: any;

  onReset: EventEmitter<any> = new EventEmitter<any>();
  modalRef: BsModalRef | null = null;
  templateTopics: Array<any> = [];
  parcialProductTypes: Array<any> = [];
  eventTypes: Array<any> = [];
  strategy: any = null;
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    customTopic: new FormControl(null, []),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
  });
  parcialProductForm: FormGroup = new FormGroup({
    parcialProductTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    customParcialProductTypeName: new FormControl(null, []),
    instructions: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, [Validators.required]),
  });
  eventForm: FormGroup = new FormGroup({
    parcialProductTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, [Validators.required]),
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

  OnTopicSelected(topic: any) {
    const customTopic = this.strategyForm.get('customTopic');
    if(!!topic) {
      if(typeof topic === 'string' && topic == this.NEW_TOPIC_NAME) customTopic?.setValidators([Validators.required]);
      else if(typeof topic === 'object' && topic.name == this.NEW_TOPIC_NAME) customTopic?.setValidators([Validators.required]);
      else {
        customTopic?.setValue(null);
        customTopic?.clearValidators();
        customTopic?.markAsUntouched();
      }
    }
    else customTopic?.clearValidators();
  }

  OnParcialProdutcTypeSelected(parcialProductType: any) {
    const customParcialProductTypeName = this.parcialProductForm.get('customParcialProductTypeName');
    if(!!parcialProductType) {
      if(typeof parcialProductType === 'string' && parcialProductType == this.NEW_TOPIC_NAME) customParcialProductTypeName?.setValidators([Validators.required]);
      else if(typeof parcialProductType === 'object' && parcialProductType.name == this.NEW_TOPIC_NAME) customParcialProductTypeName?.setValidators([Validators.required]);
      else {
        customParcialProductTypeName?.setValue(null);
        customParcialProductTypeName?.clearValidators();
        customParcialProductTypeName?.markAsUntouched();
      }
    }
    else customParcialProductTypeName?.clearValidators();
  }

  NextStep(template: any, advanceStep: boolean = true) {
    this.Save().then(saved => {
      this.onReset.emit();
      if(this.step == 4) this.OpenModal(template);
      else if(!!saved && advanceStep) this.step++;
    });
  }
  
  Save() {
    return new Promise<boolean>(async (res, rej) => {
      try {
        switch (this.step) {
          case 1: res(await this.SaveStragey()); break;
          case 2: res(await this.SaveParcialProduct()); break;
          case 3: res(await this.SaveParcialProduct(true)); break;
          case 4: res(await this.SaveEvent()); break;
          default: res(false); break;
        }
      } catch (err) {
        console.error(err);
      }
    });
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
      this.templateTopics.unshift({
        id: 0,
        name: this.NEW_TOPIC_NAME,
      });
    }, err => {
      console.error("Erro getting template topics", err);
    });
  }

  GetParcialProductTypes() {
    this.api.Get(`/ParcialProductTypes`).subscribe(types => {
      types.unshift({
        id: 0,
        name: this.NEW_TOPIC_NAME,
        // type: 'Agregar'
      });
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
    return new Promise<boolean>((res, rej) => {
      if(!this.strategyForm.valid) {
        this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
        this.strategyForm.markAllAsTouched();
        res(false);
        return;
      }
      
      this.api.Patch(`/Strategies/${this.strategyId}`, {strategy: this.strategyForm.value}).subscribe(strategySaved => {
        this.InitializeStrategyForm(strategySaved);
        res(true);
      }, err => {
        console.error("Error updating strategy", err);
        res(false);
      });
    });
  }

  SaveParcialProduct(isParcialProductFinal: boolean = false) {
    return new Promise<boolean>((res, rej) => {
      if(!this.parcialProductForm.valid) {
        this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
        this.parcialProductForm.markAllAsTouched();
        res(false);
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
        res(true);
      }, err => {
        console.error("Error posting new parcial product", err);
        res(false);
      });
    });
  }
  
  SaveEvent() {
    return new Promise<boolean>((res, rej) => {
      if(!this.eventForm.valid) {
        this.toast.ShowWarning(`Favor de llenar todos los campos correctamente`);
        this.eventForm.markAllAsTouched();
        res(false);
        return;
      }
      
      let parcialProduct = {
        ...this.eventForm.value,
        strategyId: this.strategyId,
        isFinal: true
      }
      
      // this.api.Post(`/Events`, {event}).subscribe(newEvent => {
      this.api.Post(`/ParcialProducts`, {parcialProduct}).subscribe(newParcialProduct => {
        res(true);
      }, err => {
        console.error("Error posting new event", err);
        res(false);
      });
    });
  }

  CatchRubrics(rubric: any) {
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
    if(exit) this.nav.GoToUserRoute('mis-estudiantes');
  }

  GoToProjectCalendar() {
    this.CloseModal();
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/estrategias/${this.strategyId}/calendario`);
  }

}
