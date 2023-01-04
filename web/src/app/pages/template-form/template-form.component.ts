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

  sepObjectives: Array<any> = [];
  skills: Array<any> = [];
  teacherSubjects: Array<any> = [];
  selectedSubjects: Array<any> = [];

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
    this.api.Get(`/Teachers/${this.user ? this.user.id : 0}/Subjects`).subscribe(subjects => {
      this.teacherSubjects = subjects;
    }, err => {
      console.error("Error getting teacher subjects", err);
    })
  }

  GetSepObjectives() {
    this.api.Get(`/SepObjectives`).subscribe(seObjectives => {
      this.sepObjectives = this.sepObjectives;
    }, err => {
      console.error("Error getting sep objectives", err);
    });
  }

  GetSkills() {

  }

  OnObjectiveSelected(objective: any) {
    console.log(objective);
  }

}
