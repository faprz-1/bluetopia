import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { RubricTutorialModalComponent } from '../rubric-tutorial-modal/rubric-tutorial-modal.component';
import { BsDatepickerDirective, BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-template-based-on-form',
  templateUrl: './template-based-on-form.component.html',
  styleUrls: ['./template-based-on-form.component.scss']
})
export class TemplateBasedOnFormComponent implements OnInit {

  @Input() template: any = null;

  @Output() goBackEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('finishModal') finishModal?: any;
  @ViewChild('rubricTutorialModal') rubricTutorialModal?: RubricTutorialModalComponent;
  @ViewChild('gradeSelect') gradeSelect?: NgSelectComponent;
  @ViewChild('groupSelect') groupSelect?: NgSelectComponent;
  @ViewChild('subjectsSelect') subjectsSelect?: NgSelectComponent;
  @ViewChild('sepObjectivesSelect') sepObjectivesSelect?: NgSelectComponent;
  @ViewChild('skillsSelect') skillsSelect?: NgSelectComponent;
  @ViewChild('templateTopicSelect') templateTopicSelect?: NgSelectComponent;
  @ViewChild('parcialProductTypeSelect') parcialProductTypeSelect?: NgSelectComponent;
  @ViewChild('eventTypeSelect') eventTypeSelect?: NgSelectComponent;
  @ViewChild('strategyDateRangePicker') strategyDateRangePicker?: BsDaterangepickerDirective;
  @ViewChild('parcialProductDatePicker') parcialProductDatePicker?: BsDatepickerDirective;

  templateId: any;
  strategyId: any;

  onReset: EventEmitter<any> = new EventEmitter<any>();
  modalRef: BsModalRef | null = null;
  grades: Array<any> = [];
  groups: Array<any> = [];
  subjects: Array<any> = [];
  sepObjectives: Array<any> = [];
  skills: Array<any> = [];
  templateTopics: Array<any> = [];
  parcialProducts: Array<any> = [];
  parcialProductTypes: Array<any> = [];
  eventTypes: Array<any> = [];
  strategy: any = null;
  grade: any;
  group: any;
  selectedSubjects: Array<any> = [];
  selectedTab: string = 'create';
  selectedEvaluationType: any = null;
  finalParicalProduct: any = null;
  loading: any = {
    grade: {},
    group: {},
    subject: {},
    sepObjective: {},
    skill: {},
    templateTopic: {},
    parcialProductType: {},
    eventType: {},
  };
  evaluationTypes: Array<any> = [];
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
    skills: new FormControl([], Validators.required),
    dates: new FormControl(null, Validators.required),
  });
  parcialProductForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    parcialProductTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    evaluationType: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, []),
    maxCalification: new FormControl(null, []),
    resources: new FormControl([], []),
  });
  eventForm: FormGroup = new FormGroup({
    eventTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  });

  step: number = 1;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService,
    private modalService: BsModalService,
    private toast: ToastService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.GetGrades();
    this.GetGroups();
    this.GetSubjects();
    this.GetSepObjectives();
    this.GetSkills();
    this.GetTemplateTopics();
    this.GetParcialProductTypes();
    this.GetEvaluationTypes();
    this.GetEventTypes();
    this.GetParams();
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }

  CloseModal() {
    if(this.modalRef) this.modalRef.hide();
  }
  
  RemoveItemFromArray(array: Array<any>, idx: number) {
    this.zone.run(() => {
      array.splice(idx, 1);
    });
  }
  
  ChangeStep(advanceStep: number = 1) {
    this.Save().then(saved => {
      this.onReset.emit();
      if(this.step == 1 && advanceStep < 0) {
        this.goBackEvent.emit();
        return;
      } else if(this.step == 5) this.OpenModal(this.finishModal);
      else if(saved && advanceStep) this.step += advanceStep;
      this.InitializeDatePickers();
      this.ScrollToTop();
    });
  }

  InitializeDatePickers() {
    setTimeout(() => {
      if(this.step == 2) {
        if(!!this.strategyDateRangePicker) this.strategyDateRangePicker.bsValue = this.GetDateRangePickerValue([this.strategy.startDate, this.strategy.endDate]);
      } else if(this.step == 3) {
        if(!!this.parcialProductDatePicker && !!this.parcialProductForm.get('date')?.value) this.parcialProductDatePicker.bsValue = new Date(this.parcialProductForm.get('date')?.value);
      } else if(this.step == 4) {
      }
    }, 10);
  }

  ScrollToTop() {
    const elements = document.getElementsByClassName('content');
    elements[0].scrollTop = 0;
  }
  
  Save() {
    return new Promise<boolean>(async (res, rej) => {
      try {
        switch (this.step) {
          case 1: res(await this.SaveStragey()); break;
          case 2: res(await this.SaveStragey()); break;
          case 3: res(true); break;
          case 4: res(true); break;
          case 5: res(await this.SaveEvent()); break;
          default: res(false); break;
        }
      } catch (err) {
        this.toast.ShowError(`Error al guardar la información`);
        console.error(err);
      }
    });
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.templateId = params['templateId'];
      this.strategyId = params['strategyId'];

      this.GetStrategy();
    });
  }

  GetGrades() {
    this.api.Get(`/Grades`).subscribe(grades => {
      this.grades = grades;
    }, err => {
      console.error("Error getting grades", err);
    });
  }

  AddGrade = (grade: string) => {
    let gradeObj = {
      name: grade
    }
    this.loading.grade.creating = true;
    this.api.Post(`/Grades`, {grade: gradeObj}).subscribe(newGrade => {
      this.grades = this.grades.concat([newGrade]);
      this.grade = newGrade.name;
      this.loading.grade.creating = false;
      this.gradeSelect?.close();
    }, err => {
      console.error("Error creatong grade", err);
      this.loading.grade.creating = false;
    });
  }
  
  GetGroups() {
    this.api.Get(`/Groups`).subscribe(groups => {
      this.groups = groups;
    }, err => {
      console.error("Error getting groups", err);
    });
  }

  AddGroup = (group: string) => {
    let groupObj = {
      name: group
    }
    this.loading.group.creating = true;
    this.api.Post(`/Groups`, {group: groupObj}).subscribe(newGroup => {
      this.groups = this.groups.concat([newGroup]);
      this.group = newGroup.name;
      this.loading.group.creating = false;
      this.groupSelect?.close();
    }, err => {
      console.error("Error creatong group", err);
      this.loading.group.creating = false;
    });
  }

  GetSubjects() {
    this.api.Get(`/Subjects`).subscribe(subjects => {
      this.subjects = subjects;
    }, err => {
      console.error("Error getting teacher subjects", err);
    });
  }

  AddSubject = (subject: string) => {
    let subjectObj = {
      name: subject
    }
    this.loading.subject.creating = true;
    this.api.Post(`/Subjects`, {subject: subjectObj}).subscribe(newSubject => {
      this.subjects = this.subjects.concat([newSubject]);
      this.loading.subject.creating = false;
      this.subjectsSelect?.close();
    }, err => {
      console.error("Error creatong subject", err);
      this.loading.subject.creating = false;
    });
  }

  GetSepObjectives() {
    this.api.Get(`/SepObjectives`).subscribe(sepObjectives => {
      this.sepObjectives = sepObjectives;
    }, err => {
      console.error("Error getting sep objectives", err);
    });
  }

  AddSepObjective = (sepObjective: string) => {
    let sepObjectiveObj = {
      name: sepObjective
    }
    this.loading.sepObjective.creating = true;
    this.api.Post(`/SepObjectives`, {sepObjective: sepObjectiveObj}).subscribe(newSepObjective => {
      this.sepObjectives = this.sepObjectives.concat([newSepObjective]);
      this.loading.sepObjective.creating = false;
      this.sepObjectivesSelect?.close();
    }, err => {
      console.error("Error creatong SepObjective", err);
      this.loading.sepObjective.creating = false;
    });
  }

  GetSkills() {
    this.api.Get(`/Skills`).subscribe(skills => {
      this.skills = skills;
    }, err => {
      console.error("Error getting skills", err);
    });
  }

  AddSkill = (skill: string) => {
    let skillObj = {
      name: skill
    }
    this.loading.skill.creating = true;
    this.api.Post(`/Skills`, {skill: skillObj}).subscribe(newSkill => {
      this.skills = this.skills.concat([newSkill]);
      this.loading.skill.creating = false;
      this.skillsSelect?.close();
    }, err => {
      console.error("Error creatong skill", err);
      this.loading.skill.creating = false;
    });
  }

  GetTemplateTopics() {
    this.api.Get(`/TemplateTopics`).subscribe(topics => {
      this.templateTopics = topics;
    }, err => {
      console.error("Erro getting template topics", err);
    });
  }

  AddTemplateTopic = (templateTopic: string) => {
    let templateTopicObj = {
      name: templateTopic,
      userId: this.api.GetUser()?.id
    }
    let control = this.strategyForm.get('topic');
    this.loading.templateTopic.creating = true;
    control?.disable();
    this.api.Post(`/TemplateTopics`, {templateTopic: templateTopicObj}).subscribe(newTemplateTopic => {
      this.templateTopics = this.templateTopics.concat([newTemplateTopic]);
      control?.setValue(newTemplateTopic.name);
      this.loading.templateTopic.creating = false;
      control?.enable();
      this.templateTopicSelect?.close();
    }, err => {
      console.error("Error creatong templateTopic", err);
      this.loading.templateTopic.creating = false;
      control?.enable();
    });
  }

  GetParcialProductTypes() {
    this.api.Get(`/ParcialProductTypes`).subscribe(types => {
      this.parcialProductTypes = types;
    }, err => {
      console.error("Error getting parcial product types", err);
    });
  }

  AddParcialProductType = (parcialProductType: string) => {
    let parcialProductTypeObj = {
      name: parcialProductType,
      type: 'Mis tipos de producto',
      userId: this.api.GetUser()?.id
    }
    let control = this.parcialProductForm.get('parcialProductTypeId');
    this.loading.parcialProductType.creating = true;
    control?.disable();
    this.api.Post(`/ParcialProductTypes`, {parcialProductType: parcialProductTypeObj}).subscribe(newParcialProductType => {
      this.parcialProductTypes = this.parcialProductTypes.concat([newParcialProductType]);
      this.parcialProductForm.get('parcialProductTypeId')?.setValue(newParcialProductType.id);
      this.loading.parcialProductType.creating = false;
      control?.enable();
      this.parcialProductTypeSelect?.close();
    }, err => {
      console.error("Error creatong parcialProductType", err);
      this.loading.parcialProductType.creating = false;
      control?.enable();
    });
  }

  GetEvaluationTypes() {
    this.api.Get(`/EvaluationTypes`).subscribe(types => {
      this.evaluationTypes = types;
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

  AddEventType = (eventType: string) => {
    let eventTypeObj = {
      name: eventType,
      userId: this.api.GetUser()?.id
    }
    let control = this.eventForm.get('eventTypeId');
    this.loading.eventType.creating = true;
    control?.disable();
    this.api.Post(`/EventTypes`, {eventType: eventTypeObj}).subscribe(newEventType => {
      this.eventTypes = this.eventTypes.concat([newEventType]);
      control?.setValue(newEventType.id);
      this.loading.eventType.creating = false;
      control?.enable();
      this.eventTypeSelect?.close();
    }, err => {
      console.error("Error creatong eventType", err);
      this.loading.eventType.creating = false;
      control?.enable();
    });
  }

  OnSelectedSubjectsChange(subject: any) {
    if(!!subject) {
      this.selectedSubjects.push(subject);
    }
  }

  OnObjectiveSelected(subject: any, objective: any) {
    if(!!objective) {
      if(!!subject.sepObjectives && Array.isArray(subject.sepObjectives)) subject.sepObjectives.push(objective);
      else subject.sepObjectives = [objective];
    }
  }

  OnSkillSelected(skill: any) {
    if(!!skill) {
      this.strategyForm.get('skills')?.value.push(skill);
    }
  }

  GetDateRangePickerValue(dates: Array<string>) {
    if(dates.some(date => !date)) return [];
    let start = new Date(dates[0]);
    let end = new Date(dates[1]);
    return [start, end];
  }

  InitializeForms(strategy: any) {
    this.strategyForm.setValue({
      id: !!strategy.id ? strategy.id : null,
      topic: !!strategy.topic ? strategy.topic : null,
      title: !!strategy.title ? strategy.title : null,
      generatingQuestion: !!strategy.generatingQuestion ? strategy.generatingQuestion : null,
      skills: !!strategy.skills ? strategy.skills : [],
      dates: !!strategy.startDate && !!strategy.endDate ? [strategy.startDate, strategy.endDate] : null,
    });
    this.grade = !!strategy.strategyGroup ? strategy.strategyGroup.grade : null;
    this.group = !!strategy.strategyGroup ? strategy.strategyGroup.group : null;
    this.selectedSubjects = !!strategy.subjects ? strategy.subjects : [];
    this.strategyForm.updateValueAndValidity();
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      if(!!strategy.parcialProducts && !!strategy.parcialProducts.length)
      this.finalParicalProduct = strategy.parcialProducts.find((parcialProduct: any) => parcialProduct.isFinal);
      this.InitializeForms(strategy);
    }, err => {
      console.error("Error getting strategy", err);
    });
  }

  SaveStragey() {
    return new Promise<boolean>((res, rej) => {
      let strategy = this.strategyForm.value;
      strategy.grade = this.grade;
      strategy.group = this.group;
      strategy.subjects = this.selectedSubjects;
      this.api.Patch(`/Strategies/${this.strategyId}`, {strategy}).subscribe(strategySaved => {
        this.InitializeForms(strategySaved);
        res(true);
      }, err => {
        console.error("Error updating strategy", err);
        res(false);
      });
    });
  }

  SaveParcialProduct(isParcialProductFinal: boolean = false) {
    return new Promise<boolean>((res, rej) => {
      let parcialProductInstance = {
        ...this.parcialProductForm.value,
        isFinal: isParcialProductFinal,
        strategyId: this.strategyId,
      }
      
      if(!!parcialProductInstance.id) {
        this.api.Patch(`/ParcialProducts/${parcialProductInstance.id}`, {parcialProduct: parcialProductInstance}).subscribe(newParcialProduct => {
          this.CancelParcialProduct();
          this.GetStrategy();
          res(true);
        }, err => {
          console.error("Error posting new parcial product", err);
          res(false);
        });
      } else {
        this.api.Post(`/ParcialProducts`, {parcialProduct: parcialProductInstance}).subscribe(newParcialProduct => {
          this.CancelParcialProduct();
          this.GetStrategy();
          res(true);
        }, err => {
          console.error("Error posting new parcial product", err);
          res(false);
        });
      }
    });
  }

  EditParcialProduct(parcialProduct: any) {
    this.parcialProductForm.setValue({
      id: !!parcialProduct.id ? parcialProduct.id : null,
      parcialProductTypeId: !!parcialProduct.parcialProductTypeId ? parcialProduct.parcialProductTypeId : null,
      name: !!parcialProduct.name ? parcialProduct.name : null,
      instructions: !!parcialProduct.instructions ? parcialProduct.instructions : null,
      date: !!parcialProduct.event ? parcialProduct.event.date : null,
      evaluationType: !!parcialProduct.evaluationType ? parcialProduct.evaluationType : null,
      rubric: !!parcialProduct.rubric ? parcialProduct.rubric : null,
      maxCalification: !!parcialProduct.maxCalification ? parcialProduct.maxCalification : null,
      resources: !!parcialProduct.resources ? parcialProduct.resources.map((parcialProduct: any) => parcialProduct.file) : [],
    });

    this.selectedTab = 'create';
    this.InitializeDatePickers();
  }

  DeleteParcialProduct(parcialProduct: any, idx: number) {
    this.RemoveItemFromArray(this.strategy.parcialProducts, idx);
  }
  
  SaveEvent() {
    return new Promise<boolean>((res, rej) => {
      this.api.Post(`/Events`, {event: this.eventForm.value}).subscribe(newEvent => {
      // this.api.Post(`/ParcialProducts`, {parcialProduct}).subscribe(newParcialProduct => {
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
    if(exit) this.nav.GoToUserRoute('mis-estrategias');
  }

  GoToProjectCalendar() {
    this.CloseModal();
    this.nav.GoToUserRoute(`estrategias/${this.strategyId}/calendario`);
  }

  CancelParcialProduct() {
    this.parcialProductForm.reset();
    this.parcialProductForm.get('resources')?.setValue([]);
  }

  OnFileSelected(event: any) {
    const files: FileList = event.target.files;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        let fileObj = {
          "encodedFileContainer": "resources",
          "base64File": btoa(binaryString),
          "name": file.name,
          "resize": false,
          "fileExtention": "." + file.name.split('.').pop()?.toLowerCase()
        };

        this.parcialProductForm.get('resources')?.value.push(fileObj);
      };
      reader.readAsBinaryString(file);
    });
  }

  OnLibraryFilesSelected(files: Array<any>) {
    this.parcialProductForm.get('resources')?.setValue(
      this.parcialProductForm.get('resources')?.value.concat(files)
    );
  }

  GetFiles(type: string): Array<any> {
    switch (type) {
      case 'new': return this.parcialProductForm.get('resources')?.value.filter((file: any) => !file.id);
      case 'old': return this.parcialProductForm.get('resources')?.value.filter((file: any) => !!file.id);
      default: return []
    }
  }

}
