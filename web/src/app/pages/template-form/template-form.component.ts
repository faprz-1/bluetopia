import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  grade: any;
  group: any;
  templateId: any;
  user: any;

  selectedTab: any = null;

  teacherSubjects: Array<any> = [];
  selectedSubjects: Array<any> = [];
  sepObjectives: Array<any> = [];
  skills: Array<any> = [];

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetParams();
  }

  GoBack() {
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas`);
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
      this.templateId = params['templateId'];

      this.GetTeacherSubjects();
      this.GetSepObjectives();
      this.GetSkills();
    });
  }

  GetTeacherSubjects() {
    // this.api.Get(`/Teachers/${this.user ? this.user.id : 0}/Subjects`).subscribe(subjects => {
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

  OnSelectedSubjectsChange(subjects: any) {
    this.selectedTab = subjects[subjects.length - 1];
  }

  OnObjectiveSelected(subject: any, objective: any) {
    if(!!objective) {
      if(!!subject.sepObjectives && Array.isArray(subject.sepObjectives)) subject.sepObjectives.push(objective);
      else subject.sepObjectives = [objective];
    }
  }

  OnSkillSelected(subject: any, skill: any) {
    if(!!skill) {
      if(!!subject.skills && Array.isArray(subject.skills)) subject.skills.push(skill);
      else subject.skills = [skill];
    }
  }

  SelectTab(subject: any) {
    this.selectedTab = subject;
  }

  CreateNewProyect() {
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/proyecto/${1}`);
    return;
    this.api.Post(`TeacherTemplates`, {subjects: this.selectedSubjects}).subscribe(newProject => {
      this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/proyecto/${newProject.id}`);
    }, err => {
      console.error("Error creating new project", err);
    })
  }

}
