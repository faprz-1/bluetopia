import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  grade: any;
  group: any;
  strategyId: any;
  strategy: any = null;
  user: any;

  selectedTab: any = null;
  loading: any = {
    getting: false,
    saving: false
  };

  teacherSubjects: Array<any> = [];
  selectedSubjects: Array<any> = [];
  sepObjectives: Array<any> = [];
  skills: Array<any> = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService,
    private zone: NgZone,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetParams();
    this.GetTeacherSubjects();
    this.GetSepObjectives();
    this.GetSkills();
  }

  GoBack() {
    let route = `plantillas`;
    if(!!this.grade && !!this.group) route = `grado/${this.grade}/grupo/${this.group}/${route}`;
    this.nav.GoToUserRoute(route);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];

      this.GetStrategy();
    });
  }

  GetTeacherSubjects() {
    this.api.Get(`/Subjects`).subscribe(subjects => {
      this.teacherSubjects = subjects;
    }, err => {
      console.error("Error getting teacher subjects", err);
    });
  }

  GetSepObjectives() {
    this.api.Get(`/SepObjectives`).subscribe(sepObjectives => {
      this.sepObjectives = sepObjectives;
    }, err => {
      console.error("Error getting sep objectives", err);
    });
  }

  GetSkills() {
    this.api.Get(`/Skills`).subscribe(skills => {
      this.skills = skills;
    }, err => {
      console.error("Error getting skills", err);
    });
  }

  GetStrategy() {
    this.loading.getting = true;
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      if(strategy && strategy.subjects) {
        this.selectedSubjects = strategy.subjects;
        this.selectedTab = this.selectedSubjects[0];
      }
      this.loading.getting = false;
      console.log(strategy);
    }, err => {
      console.error("Error getting strategy", err);
      this.loading.getting = false;
    });
  }

  SaveStragey() {
    if(!this.AreFormsValid()) {
      this.toast.ShowWarning(`Favor de seleccionar objetivos y competencias para todas las materias`);
      return;
    }

    this.loading.saving = true;
    let strategy = {
      id: this.strategyId,
      subjects: this.selectedSubjects,
    }
    this.api.Patch(`/Strategies/${this.strategyId}`, {strategy}).subscribe(strategySaved => {
      this.nav.GoToUserRoute(`estrategias/${this.strategyId}`);
      this.loading.saving = false;
    }, err => {
      console.error("Error updating strategy", err);
      this.loading.saving = false;
    });
  }

  OnSelectedSubjectsChange(subject: any) {
    if(!!subject) {
      this.selectedSubjects.push(subject);
      this.selectedTab = subject;
    }
  }

  OnObjectiveSelected(subject: any, objective: any) {
    if(!!objective) {
      if(!!subject.sepObjectives && Array.isArray(subject.sepObjectives)) subject.sepObjectives.push(objective);
      else subject.sepObjectives = [objective];
    }
  }

  OnSkillSelected(subject: any, skill: any) {
    if(!!skill) {
      this.selectedSubjects.forEach(subject => {
        if(!!subject.skills && Array.isArray(subject.skills)) subject.skills.push(skill);
        else subject.skills = [skill];
      });
    }
  }

  SelectTab(subject: any) {
    this.selectedTab = subject;
  }

  AreFormsValid(): boolean {
    let isValid = true;
    this.selectedSubjects.forEach(subject => {
      if(!subject.sepObjectives || subject.sepObjectives.length == 0) isValid = false;
      if(!subject.skills || subject.skills.length == 0) isValid = false;
    });
    return isValid;
  }

  RemoveItemFromArray(array: Array<any>, idx: number) {
    this.zone.run(() => {
      array.splice(idx, 1);
    });
  }

}
