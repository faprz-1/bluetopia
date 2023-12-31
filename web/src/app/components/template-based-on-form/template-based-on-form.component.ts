import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { RubricTutorialModalComponent } from '../rubric-tutorial-modal/rubric-tutorial-modal.component';
import {
  BsDatepickerDirective,
  BsDaterangepickerDirective,
} from 'ngx-bootstrap/datepicker';
import * as moment from 'moment-timezone';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-template-based-on-form',
  templateUrl: './template-based-on-form.component.html',
  styleUrls: ['./template-based-on-form.component.scss'],
})
export class TemplateBasedOnFormComponent implements OnInit {
  @Input() template: any = null;

  @Output() goBackEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('finishModal') finishModal?: any;
  @ViewChild('rubricTutorialModal')
  rubricTutorialModal?: RubricTutorialModalComponent;
  @ViewChild('gradeSelect') gradeSelect?: NgSelectComponent;
  @ViewChild('groupSelect') groupSelect?: NgSelectComponent;
  @ViewChild('subjectsSelect') subjectsSelect?: NgSelectComponent;
  @ViewChild('sepObjectivesSelect') sepObjectivesSelect?: NgSelectComponent;
  @ViewChild('skillsSelect') skillsSelect?: NgSelectComponent;
  @ViewChild('templateTopicSelect') templateTopicSelect?: NgSelectComponent;
  @ViewChild('parcialProductTypeSelect')
  parcialProductTypeSelect?: NgSelectComponent;
  @ViewChild('eventTypeSelect') eventTypeSelect?: NgSelectComponent;
  @ViewChild('strategyDateRangePicker')
  strategyDateRangePicker?: BsDaterangepickerDirective;
  @ViewChild('parcialProductDatePicker')
  parcialProductDatePicker?: BsDatepickerDirective;
  @ViewChild('finalParcialProductDatePicker')
  finalParcialProductDatePicker?: BsDatepickerDirective;
  @ViewChild('finalEventDatePicker')
  finalEventDatePicker?: BsDatepickerDirective;

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
  selectedParcialProduct: any = null;
  parcialProductTypes: Array<any> = [];
  eventTypes: Array<any> = [];
  strategy: any = null;
  grade: any;
  group: any;
  selectedSubjects: Array<any> = [];
  selectedTab: string = 'create';
  selectedEvaluationType: any = null;
  finalParcialProduct: any = null;
  finalEvent: any = null;
  canContinue: boolean = true;
  loading: any = {
    grade: false,
    group: false,
    subject: false,
    sepObjective: false,
    skill: false,
    templateTopic: false,
    parcialProduct: false,
    parcialProductType: false,
    eventType: false,
    event: false,
  };
  lastSave: moment.Moment | null = null;
  evaluationTypes: Array<any> = [];
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    schoolId: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
    skills: new FormControl([], Validators.required),
    dates: new FormControl(null, Validators.required),
  });
  parcialProductForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    parcialProductTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    eventId: new FormControl(null, []),
    evaluationType: new FormControl(null, [Validators.required]),
    rubric: new FormControl(null, []),
    maxCalification: new FormControl(null, []),
    resources: new FormControl([], []),
  });
  eventForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    eventTypeId: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
  });

  step: number = 1;
  noGroupMessage = '';
  public get isLoading() {
    for (const key in this.loading) {
      if (Object.prototype.hasOwnProperty.call(this.loading, key)) {
        const element = this.loading[key];
        if (element) return true;
      }
    }
    return false;
  }
  saver = new Subject();
  subSelected: any = null;
  wrongInfo: boolean = false;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService,
    private modalService: BsModalService,
    private toast: ToastService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.GetTeacherGroups();
    this.SetGroupsOfSelectedGrade(this.grade);
    this.GetSubjects();
    this.GetSepObjectives();
    this.GetSkills();
    this.GetTemplateTopics();
    this.GetParcialProductTypes();
    this.GetEvaluationTypes();
    this.GetEventTypes();
    this.GetParams();

    this.saver.pipe(debounceTime(100)).subscribe((data) =>{ this.Autosave()});
  }

  IsANumber(input: any) {
    if (isNaN(Number(input))) {
      this.toast.ShowError('Solo valores numéricos');
      this.canContinue = false;
    } else {
      this.canContinue = true;
    }
  }

  OpenModal(template: any) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static' });
  }

  CloseModal() {
    if (this.modalRef) this.modalRef.hide();
  }

  RemoveItemFromArray(array: Array<any>, idx: number) {
    this.zone.run(() => {
      array.splice(idx, 1);
    });
    this.GetSubjects();
    this.GetSepObjectives();
    this.GetSkills();
    this.saver.next();
  }

  ChangeStep(advanceStep: number = 1) {
    this.onReset.emit();
    if (this.step == 1 && advanceStep < 0) {
      this.goBackEvent.emit();
      return;
    } else if (this.step == 5 && advanceStep > 0)
      this.OpenModal(this.finishModal);
    else if (advanceStep) this.step += advanceStep;

    switch (this.step) {
      case 2:
        this.InitializeDatePickers();
        break;
      case 3:
        this.CancelParcialProduct();
        break;
      case 4:
        this.InitializeFinalProductForm();
        break;
      case 5:
        this.InitializeCloseEventForm();
        break;
    }
    this.ScrollToTop();
  }

  InitializeFinalProductForm() {
    this.parcialProductForm.setValue({
      id: !!this.finalParcialProduct?.id ? this.finalParcialProduct.id : null,
      parcialProductTypeId: !!this.finalParcialProduct?.parcialProductTypeId
        ? this.finalParcialProduct.parcialProductTypeId
        : null,
      name: !!this.finalParcialProduct?.name
        ? this.finalParcialProduct.name
        : null,
      instructions: !!this.finalParcialProduct?.instructions
        ? this.finalParcialProduct.instructions
        : null,
      date: !!this.finalParcialProduct?.event
        ? this.finalParcialProduct.event.date
        : null,
      eventId: !!this.finalParcialProduct?.eventId
        ? this.finalParcialProduct.eventId
        : null,
      evaluationType: !!this.finalParcialProduct?.evaluationType
        ? this.finalParcialProduct.evaluationType
        : null,
      rubric: !!this.finalParcialProduct?.rubric
        ? this.finalParcialProduct.rubric
        : null,
      maxCalification: !!this.finalParcialProduct?.maxCalification
        ? this.finalParcialProduct.maxCalification
        : null,
      resources: !!this.finalParcialProduct?.resources
        ? this.finalParcialProduct.resources.map(
            (parcialProduct: any) => parcialProduct.file
          )
        : [],
    });
    this.InitializeDatePickers();
  }

  InitializeCloseEventForm() {
    this.eventForm.setValue({
      id: !!this.finalEvent ? this.finalEvent.id : null,
      eventTypeId: !!this.finalEvent ? this.finalEvent.eventTypeId : null,
      name: !!this.finalEvent ? this.finalEvent.name : null,
      description: !!this.finalEvent ? this.finalEvent.description : null,
      instructions: !!this.finalEvent ? this.finalEvent.instructions : null,
      date: !!this.finalEvent ? this.finalEvent.date : null,
    });

    this.InitializeDatePickers();
  }

  ThatDateAlreadyPassed(date: any) {
    let startDate = moment(date[0]);
    let today = moment();
    if (startDate.isBefore(today, 'day')) {
      this.toast.ShowError(
        'La fecha proporcionada ya ha pasado, por favor elija otra fecha'
      );
      this.canContinue = false;
    } else {
      this.canContinue = true;
    }
  }

  InitializeDatePickers() {
    setTimeout(() => {
      switch (this.step) {
        case 2:
          if (!!this.strategyDateRangePicker)
            this.strategyDateRangePicker.bsValue = this.GetDateRangePickerValue(
              [this.strategy.startDate, this.strategy.endDate]
            );

          break;
        case 3:
          if (
            !!this.parcialProductDatePicker &&
            !!this.parcialProductForm.get('date')?.value
          )
            this.parcialProductDatePicker.bsValue = new Date(
              this.parcialProductForm.get('date')?.value
            );
          break;
        case 4:
          if (
            !!this.finalParcialProductDatePicker &&
            !!this.parcialProductForm.get('date')?.value
          )
            this.finalParcialProductDatePicker.bsValue = new Date(
              this.parcialProductForm.get('date')?.value
            );
          break;
        case 5:
          if (
            !!this.finalEventDatePicker &&
            !!this.eventForm.get('date')?.value
          )
            this.finalEventDatePicker.bsValue = new Date(
              this.eventForm.get('date')?.value
            );
          break;
      }
    }, 10);
  }

  ScrollToTop() {
    const elements = document.getElementsByClassName('content');
    elements[0].scrollTop = 0;
  }

  Autosave() {
    this.Save();
    this.lastSave = moment().tz('America/Mexico_City');
  }

  Save() {
    return new Promise<boolean>(async (res, rej) => {
      try {
        switch (this.step) {
          case 1:
            res(await this.SaveStrategy());
            break;
          case 2:
            res(await this.SaveStrategy());
            break;
          case 3:
            res(true);
            break;
          case 4:
            res(await this.SaveParcialProduct(true));
            break;
          case 5:
            res(await this.SaveEvent());
            break;
          default:
            res(false);
            break;
        }
      } catch (err) {
        this.toast.ShowError(`Error al guardar la información`);
        console.error(err);
        rej(err);
      }
    });
  }

  GetParams() {
    this.activatedRoute.params.subscribe((params) => {
      this.templateId = params['templateId'];
      this.strategyId = params['strategyId'];
      this.GetStrategy();
    });
  }

  GetGrades() {
    this.api.Get(`/Grades`).subscribe(
      (grades) => {
        this.grades = grades;
      },
      (err) => {
        console.error('Error getting grades', err);
      }
    );
  }

  AddGrade = (grade: string) => {
    let gradeObj = {
      name: grade,
    };
    this.loading.grade = true;
    this.api.Post(`/Grades`, { grade: gradeObj }).subscribe(
      (newGrade) => {
        this.grades = this.grades.concat([newGrade]);
        this.grade = newGrade.name;
        this.loading.grade = false;
        this.gradeSelect?.close();
      },
      (err) => {
        console.error('Error creatong grade', err);
        this.loading.grade = false;
      }
    );
  };

  GetGroups() {
    this.api.Get(`/Groups`).subscribe(
      (groups) => {
        this.groups = groups;
      },
      (err) => {
        console.error('Error getting groups', err);
      }
    );
  }

  GetTeacherGroups() {
    let user = this.api.GetUser();
    this.api.Get(`/TeacherGroups/of/${user.teacher?.id}`).subscribe(
      (groups) => {
        this.SetGrades(groups);
      },
      (err) => {
        console.error('Error getting groups', err);
      }
    );
  }

  GroupByProperty(teacherGroups: any, property: string) {
    const groupedData: any = Object.values(
      teacherGroups.reduce((result: any, item: any) => {
        const valueToGroupBy = item[property];
        if (!result[valueToGroupBy]) {
          result[valueToGroupBy] = [];
        }
        result[valueToGroupBy].push(item);
        return result;
      }, {})
    );
    return groupedData;
  }

  SetGrades(teacherGroups: any) {
    this.grades = [];
    let groupedByGrade = this.GroupByProperty(teacherGroups, 'gradeId');
    groupedByGrade.forEach((grade: any) => {
      let auxGrade: any = grade[0].grade;
      auxGrade.groups = grade.map((item: any) => item.group);
      this.grades.push(auxGrade);
    });
    this.grades = this.SortbyName(this.grades);
  }

  SortbyName(objects: any) {
    return objects.sort((a: any, b: any) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }

  SetGroupsOfSelectedGrade(gradeId: any) {
    this.groups = [];
    if (!gradeId || gradeId == null || gradeId == 0) {
      this.groups = [];
    } else {
      let selectedGrade = this.grades.filter(
        (grade: any) => grade.id == gradeId
      );
      this.groups = selectedGrade.length > 0 ? selectedGrade[0].groups : [];
    }
    this.groups = this.SortbyName(this.groups);
  }

  AddGroup = (group: string) => {
    let groupObj = {
      name: group,
    };
    this.loading.group = true;
    this.api.Post(`/Groups`, { group: groupObj }).subscribe(
      (newGroup) => {
        this.groups = this.groups.concat([newGroup]);
        this.group = newGroup.name;
        this.loading.group = false;
        this.groupSelect?.close();
      },
      (err) => {
        console.error('Error creatong group', err);
        this.loading.group = false;
      }
    );
  };

  GetSubjects() {
    this.api.Get(`/Subjects`).subscribe(
      (subjects) => {
        this.subjects = subjects;
      },
      (err) => {
        console.error('Error getting teacher subjects', err);
      }
    );
  }

  RemoveSelectedSubject(subject: any) {
    let subjectsCopy = [...this.subjects];
    let selectedId = this.subjects.findIndex((sub) => {
      return sub.id === subject.id;
    });
    if (selectedId != -1) subjectsCopy.splice(selectedId, 1);
    this.subjects = subjectsCopy;
  }

  RemoveSelectedSkill(skill: any) {
    let skillsCopy = [...this.skills];
    let selectedId = this.skills.findIndex((sk) => {
      return sk.id === skill.id;
    });
    if (selectedId != -1) skillsCopy.splice(selectedId, 1);
    this.skills = skillsCopy;
  }

  AddSubject = (subject: string) => {
    let subjectObj = {
      name: subject,
    };
    this.loading.subject = true;
    this.api.Post(`/Subjects`, { subject: subjectObj }).subscribe(
      (newSubject) => {
        this.subjects = this.subjects.concat([newSubject]);
        this.loading.subject = false;
        this.OnSelectedSubjectsChange(newSubject);
        this.subjectsSelect?.close();
      },
      (err) => {
        console.error('Error creatong subject', err);
        this.loading.subject = false;
      }
    );
  };

  GetSepObjectives() {
    this.api.Get(`/SepObjectives`).subscribe(
      (sepObjectives) => {
        this.sepObjectives = this.GroupSepGoalsBy(sepObjectives, 'subjectId');
      },
      (err) => {
        console.error('Error getting sep objectives', err);
      }
    );
  }

  GetMySelectableGoals(subject: any) {
    let goalsToSelect = this.sepObjectives.filter(
      (group: any) => group.subjectId === subject
    );
    return goalsToSelect.length > 0 ? goalsToSelect[0].items : [];
  }

  GroupSepGoalsBy(array: any, key: any) {
    return Object.values(
      array.reduce((result: any, item: any) => {
        const keyValue = item[key];
        if (!result[keyValue]) {
          result[keyValue] = { [key]: keyValue, items: [] };
        }
        result[keyValue].items.push(item);
        return result;
      }, {})
    );
  }

  AddSepObjective = (sepObjective: string) => {
    let sepObjectiveObj = {
      name: sepObjective,
      subjectId: this.subSelected.id,
    };
    this.loading.sepObjective = true;
    this.api.Post(`/SepObjectives`, sepObjectiveObj).subscribe(
      (newSepObjective) => {
        this.GetSepObjectives();
        this.loading.sepObjective = false;
        this.OnObjectiveSelected(this.subSelected, newSepObjective);
        this.sepObjectivesSelect?.close();
      },
      (err) => {
        console.error('Error creatong SepObjective', err);
        this.loading.sepObjective = false;
      }
    );
  };

  GetSkills() {
    this.api.Get(`/Skills`).subscribe(
      (skills) => {
        this.skills = skills;
      },
      (err) => {
        console.error('Error getting skills', err);
      }
    );
  }

  AddSkill = (skill: string) => {
    let skillObj = {
      name: skill,
    };
    this.loading.skill = true;
    this.api.Post(`/Skills`, skillObj).subscribe(
      (newSkill) => {
        this.skills = this.skills.concat([newSkill]);
        this.loading.skill = false;
        this.OnSkillSelected(newSkill);
        this.skillsSelect?.close();
      },
      (err) => {
        console.error('Error creatong skill', err);
        this.loading.skill = false;
      }
    );
  };

  GetTemplateTopics() {
    this.api
      .Get(`/TemplateTopics/OfSchool/${this.api.GetUser()?.schoolId}`)
      .subscribe(
        (topics) => {
          this.templateTopics = topics;
        },
        (err) => {
          console.error('Erro getting template topics', err);
        }
      );
  }

  AddTemplateTopic = (templateTopic: string) => {
    let templateTopicObj = {
      name: templateTopic,
      userId: this.api.GetUser()?.id,
      schoolId: this.api.GetUser()?.schoolId,
    };
    let control = this.strategyForm.get('topic');
    this.loading.templateTopic = true;
    control?.disable();
    this.api
      .Post(`/TemplateTopics`, { templateTopic: templateTopicObj })
      .subscribe(
        (newTemplateTopic) => {
          this.templateTopics = this.templateTopics.concat([newTemplateTopic]);
          control?.setValue(newTemplateTopic.name);
          this.loading.templateTopic = false;
          control?.enable();
          this.templateTopicSelect?.close();
        },
        (err) => {
          console.error('Error creatong templateTopic', err);
          this.loading.templateTopic = false;
          control?.enable();
        }
      );
  };

  GetParcialProductTypes() {
    this.api.Get(`/ParcialProductTypes`).subscribe(
      (types) => {
        this.parcialProductTypes = types;
      },
      (err) => {
        console.error('Error getting parcial product types', err);
      }
    );
  }

  AddParcialProductType = (parcialProductType: string) => {
    let parcialProductTypeObj = {
      name: parcialProductType,
      type: 'Mis tipos de producto',
      userId: this.api.GetUser()?.id,
    };
    let control = this.parcialProductForm.get('parcialProductTypeId');
    this.loading.parcialProductType = true;
    control?.disable();
    this.api
      .Post(`/ParcialProductTypes`, {
        parcialProductType: parcialProductTypeObj,
      })
      .subscribe(
        (newParcialProductType) => {
          this.parcialProductTypes = this.parcialProductTypes.concat([
            newParcialProductType,
          ]);
          this.parcialProductForm
            .get('parcialProductTypeId')
            ?.setValue(newParcialProductType.id);
          this.loading.parcialProductType = false;
          control?.enable();
          this.parcialProductTypeSelect?.close();
        },
        (err) => {
          console.error('Error creatong parcialProductType', err);
          this.loading.parcialProductType = false;
          control?.enable();
        }
      );
  };

  GetEvaluationTypes() {
    this.api.Get(`/EvaluationTypes`).subscribe(
      (types) => {
        this.evaluationTypes = types;
      },
      (err) => {
        console.error('Error getting parcial product types', err);
      }
    );
  }

  GetEventTypes() {
    this.api.Get(`/EventTypes`).subscribe(
      (types) => {
        this.eventTypes = types;
      },
      (err) => {
        console.error('Error getting event types', err);
      }
    );
  }

  AddEventType = (eventType: string) => {
    let eventTypeObj = {
      name: eventType,
      userId: this.api.GetUser()?.id,
    };
    let control = this.eventForm.get('eventTypeId');
    this.loading.eventType = true;
    control?.disable();
    this.api.Post(`/EventTypes`, { eventType: eventTypeObj }).subscribe(
      (newEventType) => {
        this.eventTypes = this.eventTypes.concat([newEventType]);
        control?.setValue(newEventType.id);
        this.loading.eventType = false;
        this.OnEventTypeSelected(newEventType);
        this.SaveEvent();
        control?.enable();
        this.eventTypeSelect?.close();
      },
      (err) => {
        console.error('Error creatong eventType', err);
        this.loading.eventType = false;
        control?.enable();
      }
    );
  };

  OnSelectedSubjectsChange(subject: any) {
    let subjectInSelected = this.selectedSubjects.indexOf(subject);
    if (!!subject && subjectInSelected == -1) {
      this.selectedSubjects.push(subject);
      this.RemoveSelectedSubject(subject);
    }
    this.saver.next();
  }

  OnObjectiveSelected(subject: any, objective: any) {
    if (!!objective) {
      if (!!subject.sepObjectives && Array.isArray(subject.sepObjectives)) {
        let id = subject.sepObjectives.findIndex((obj: any) => {
          return obj.id === objective.id;
        });
        if (id == -1) subject.sepObjectives.push(objective);
      } else subject.sepObjectives = [objective];
    }
    this.saver.next();
  }

  OnSkillSelected(skill: any) {
    if (!!skill) {
      let id = this.strategyForm.get('skills')?.value.findIndex((obj: any) => {
        return obj.id === skill.id;
      });
      if (id == -1) {
        this.strategyForm.get('skills')?.value.push(skill);
        this.RemoveSelectedSkill(skill);
      }
      this.saver.next();
    }
  }

  GetDateRangePickerValue(dates: Array<string>) {
    if (dates.some((date) => !date)) return [];
    let start = new Date(dates[0]);
    let end = new Date(dates[1]);
    this.ThatDateAlreadyPassed([start, end]);
    return [start, end];
  }

  InitializeForms(strategy: any) {
    this.gradeSelect?.close();
    this.strategyForm.setValue({
      id: !!strategy.id ? strategy.id : null,
      schoolId: !!strategy.schoolId ? strategy.schoolId : null,
      topic: !!strategy.topic ? strategy.topic : null,
      title: !!strategy.title ? strategy.title : null,
      generatingQuestion: !!strategy.generatingQuestion
        ? strategy.generatingQuestion
        : null,
      skills: !!strategy.skills ? strategy.skills : [],
      dates:
        !!strategy.startDate && !!strategy.endDate
          ? this.GetDateRangePickerValue([strategy.startDate, strategy.endDate])
          : null,
    });
    this.grade = !!strategy.strategyGroup ? strategy.strategyGroup.grade : null;
    this.group = !!strategy.strategyGroup ? strategy.strategyGroup.group : null;
    this.selectedSubjects = !!strategy.subjects ? strategy.subjects : [];
    this.selectedSubjects.forEach((subject) => {
      this.RemoveSelectedSubject(subject);
    });

    if (strategy.skills) {
      strategy.skills.forEach((skill: any) => {
        this.RemoveSelectedSkill(skill);
      });
    }
    this.strategyForm.updateValueAndValidity();
    this.SetGradeGroupMessage();
  }

  SetGradeGroupMessage() {
    if (!this.grade && !this.group)
      this.noGroupMessage = 'No se ha seleccionado un grado y grupo';
    else if (!this.grade)
      this.noGroupMessage = 'No se ha seleccionado un grado';
    else if (!this.group)
      this.noGroupMessage = 'No se ha seleccionado un grupo';
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(
      (strategy) => {
        this.strategy = strategy;
        this.grade = strategy.strategyGroup
          ? strategy.strategyGroup.gradeId
          : null;
        this.SetGroupsOfSelectedGrade(this.grade);
        this.group = strategy.strategyGroup
          ? strategy.strategyGroup.groupId
          : null;
        if (!!strategy.parcialProducts && !!strategy.parcialProducts.length)
          this.finalParcialProduct = strategy.parcialProducts.find(
            (parcialProduct: any) => parcialProduct.isFinal
          );
        this.finalEvent = strategy.events.find((event: any) => event.isFinal);
        this.InitializeForms(strategy);
      },
      (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  SaveStrategy() {
    return new Promise<boolean>((res, rej) => {
      let strategy = this.strategyForm.value;
      strategy.grade = this.grade ? this.grade : 0;
      this.SetGroupsOfSelectedGrade(strategy.grade.id);
      strategy.group = this.group ? this.group : 0;
      strategy.subjects = this.selectedSubjects;
      this.gradeSelect?.close();
      this.api
        .Patch(`/Strategies/${this.strategyId}`, { strategy })
        .pipe(takeUntil(this.saver))
        .subscribe(
          (strategySaved) => {
            this.InitializeForms(strategySaved);
            res(true);
          },
          (err) => {
            console.error('Error updating strategy', err);
            res(false);
          }
        );
    });
  }
  EvaluationProductsInfo(parcialProductInstance: any): boolean {
    if(!this.parcialProductForm.get('evaluationType')?.touched) return false;
    if (parcialProductInstance.evaluationType == null) {
      //  this.toast.ShowError('La evaluación no puede quedar en blanco');
      this.wrongInfo = true;
      return true;
    }
    switch (parcialProductInstance.evaluationType.type) {
      case 'rubric':
        for (let rubric of parcialProductInstance.rubric) {
          if (rubric.description == '') {
            this.toast.ShowError(
              'Todos los campos de la rúbrica deberían estar completos'
            );
            this.wrongInfo = true;
            return true;
          }
        }
        return false;

      case 'numeric':
        if (parcialProductInstance.maxCalification == null) {
          this.toast.ShowError(
            'El valor máximo de la evaluación no puede quedar en blanco'
          );
          this.wrongInfo = true;
          return true;
        }
        this.wrongInfo = false;
        return false;

      default:
        return false;
    }
  }

  SaveParcialProduct(isParcialProductFinal: boolean = false) {
    return new Promise<boolean>((res, rej) => {
      let parcialProductInstance = {
        ...this.parcialProductForm.value,
        isFinal: isParcialProductFinal,
        strategyId: this.strategyId,
      };
      let isEvaluationEmpty = this.EvaluationProductsInfo(parcialProductInstance);
      parcialProductInstance.evaluationTypeId = parcialProductInstance.evaluationType ? parcialProductInstance.evaluationType.id : null;
      if (!isEvaluationEmpty && (this.parcialProductForm.get('evaluationType')?.touched ? parcialProductInstance.evaluationTypeId != null:true)) {
        if (!!parcialProductInstance.id) {
          this.api
            .Patch(
              `/ParcialProducts/${parcialProductInstance.id}`,
              parcialProductInstance,
              true
            )
            .subscribe(
              (newParcialProduct) => {
                if (!isParcialProductFinal) this.CancelParcialProduct();
                this.GetStrategy();
                if(!isParcialProductFinal)  this.toast.ShowSuccess('Cambios guardados correctamente');
                res(true);
              },
              (err) => {
                console.error('Error posting new parcial product', err);
                res(false);
              }
            );
        } else {
          this.api
            .Post(`/ParcialProducts`, {
              parcialProduct: parcialProductInstance,
            })
            .subscribe(
              (newParcialProduct) => {
                if (!isParcialProductFinal) this.CancelParcialProduct();
                this.GetStrategy();
                if(!isParcialProductFinal) this.toast.ShowSuccess(
                  'Producto parcial guardado correctamente dirígete a la sección de ‘Productos guardados’'
                );
                res(true);
              },
              (err) => {
                console.error('Error posting new parcial product', err);
                res(false);
              }
            );
        }
        this.wrongInfo = false;
      }else{
        this.canContinue = false;
      }

      if(!isParcialProductFinal)this.Autosave();
    });
  }

  EditParcialProduct(parcialProduct: any) {
    this.parcialProductForm.setValue({
      id: !!parcialProduct.id ? parcialProduct.id : null,
      parcialProductTypeId: !!parcialProduct.parcialProductTypeId
        ? parcialProduct.parcialProductTypeId
        : null,
      name: !!parcialProduct.name ? parcialProduct.name : null,
      instructions: !!parcialProduct.instructions
        ? parcialProduct.instructions
        : null,
      date: !!parcialProduct.event ? parcialProduct.event.date : null,
      eventId: !!parcialProduct.eventId ? parcialProduct.eventId : null,
      evaluationType: !!parcialProduct.evaluationType
        ? parcialProduct.evaluationType
        : null,
      rubric: !!parcialProduct.rubric ? parcialProduct.rubric : null,
      maxCalification: !!parcialProduct.maxCalification
        ? parcialProduct.maxCalification
        : null,
      resources: !!parcialProduct.resources
        ? parcialProduct.resources.map(
            (parcialProduct: any) => parcialProduct.file
          )
        : [],
    });

    this.selectedTab = 'create';
    this.InitializeDatePickers();
  }

  DeleteParcialProduct(parcialProduct: any) {
    const idx = this.strategy.parcialProducts.findIndex(
      (product: any) => product.id == parcialProduct.id
    );
    if (idx != -1) {
      this.loading.parcialProduct = true;
      this.api.Delete(`/ParcialProducts/${parcialProduct.id}`).subscribe(
        (deleted) => {
          this.loading.parcialProduct = true;
          this.RemoveItemFromArray(this.strategy.parcialProducts, idx);
          this.toast.ShowSuccess('Producto parcial eliminado correctamente');
          this.CloseModal();
          this.loading.parcialProduct = false;
        },
        (err) => {
          console.error('Error deleting parcial product', err);
          this.toast.ShowError(`Error al eliminar producto parcial`);
          this.loading.parcialProduct = false;
        }
      );
    }
  }

  OnEventTypeSelected(eventType: any) {
    let description = '';
    if (!!eventType) {
      description = eventType.description;
    }
    this.eventForm.get('description')?.setValue(description);
  }

  SaveEvent() {
    return new Promise<boolean>((res, rej) => {
      let eventInstance = {
        ...this.eventForm.value,
        name: `${
          !!this.strategy?.title ? this.strategy.title : 'Sin título'
        }: Evento de cierre`,
        strategyId: this.strategyId,
        isFinal: true,
      };
      this.loading.event = true;

      this.api.Patch(`/Events`, { event: eventInstance }).subscribe(
        (eventSaved) => {
          this.loading.event = false;
          this.finalEvent = eventSaved;
          this.eventForm.controls['id']?.setValue(eventSaved.id);
          res(true);
        },
        (err) => {
          console.error('Error posting new event', err);
          this.loading.event = false;
          res(false);
        }
      );
    });
  }

  CatchRubrics(rubric: any) {
    switch (this.step) {
      case 2:
      case 3:
        this.parcialProductForm.get('rubric')?.setValue(rubric);
        break;
      case 4:
        this.parcialProductForm.get('rubric')?.setValue(rubric);
        break;
      case 5:
        this.eventForm.get('rubric')?.setValue(rubric);
        break;
    }
  }

  SaveProject(exit: boolean = false) {
    this.CloseModal();
    if (exit) this.nav.GoToUserRoute('mis-estrategias');
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
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        let fileObj = {
          encodedFileContainer: 'resources',
          base64File: btoa(binaryString),
          name: file.name,
          resize: false,
          fileExtention: '.' + file.name.split('.').pop()?.toLowerCase(),
        };

        this.parcialProductForm.get('resources')?.value.push(fileObj);
      };
      reader.readAsBinaryString(file);
    });
    this.saver.next();
  }

  OnLibraryFilesSelected(files: Array<any>) {
    this.parcialProductForm
      .get('resources')
      ?.setValue(this.parcialProductForm.get('resources')?.value.concat(files));
  }

  GetFiles(type: string): Array<any> {
    switch (type) {
      case 'new':
        return this.parcialProductForm
          .get('resources')
          ?.value.filter((file: any) => !file.id);
      case 'old':
        return this.parcialProductForm
          .get('resources')
          ?.value.filter((file: any) => !!file.id);
      default:
        return [];
    }
  }

  CalculateProgress() {
    switch (this.step) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      default:
        return 0;
    }
  }

  GoToStep(step: any) {
    this.step = step;
  }
}
