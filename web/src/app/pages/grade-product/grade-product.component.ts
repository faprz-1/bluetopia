import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-grade-product',
  templateUrl: './grade-product.component.html',
  styleUrls: ['./grade-product.component.scss']
})
export class GradeProductComponent implements OnInit {

  setRubricsEvaluations: EventEmitter<any> = new EventEmitter<any>();

  strategyId: any;
  studentId: any;
  teamId: any;
  parcialProductId: any;
  strategy: any = null;
  student: any = null;
  team: any = null;
  parcialProduct: any = null;
  studentFiles: Array<any> = [];
  rubricsCalifications: Array<any> = [];
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Evaluar', route: null},
  ];
  evaluationForm: FormGroup = new FormGroup({
    calification: new FormControl(null, [ValidationService.CheckOnlyNumbers]),
    rubricsCalifications: new FormControl(null, []),
    comment: new FormControl(null, []),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private nav: NavigationService,
    private toast: ToastService,
    private downloadService: DownloadFileService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  BuildStudentFullName(student: any): string {
    if(!!student) return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
    return '';
  }

  CalculateNumericCalification(maxCalification: number, calification: number): number {
    let finalCalification = 0;
    if(!!maxCalification && !!calification) finalCalification = 100 / maxCalification * calification;
    return !Number.isNaN(finalCalification) ? finalCalification : 0;
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.studentId = params['studentId'];
      this.teamId = params['teamId'];
      this.parcialProductId = params['parcialProductId'];

      this.GetStrategy();
      if(!!this.teamId) this.GetTeam();
    });
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(
      (strategy) => {
        this.strategy = strategy;
        if(!!strategy.strategyGroup) {
          this.crumbs.push({ name: `${strategy?.strategyGroup?.grade?.name}°${strategy?.strategyGroup?.group?.name}`.toUpperCase(), route: null });
        }
        if(!strategy.isByTeams) this.GetStudent();
        if(!!strategy.parcialProducts?.length) {
          this.parcialProduct = strategy.parcialProducts.find((pp: any) => pp.id == this.parcialProductId);
        }
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  DownloadResource(file: any) {
    this.downloadService.Download(file.URL, file?.name);
  }

  GetTeam() {
    this.api.Get(`/Teams/${this.teamId}/WithEvaluationsOf/ParcialProduct/${this.parcialProductId}`).subscribe(
      (team) => {
        team.members = team.members.map((member: any) => {
          member.comment = member.student?.evaluations[0]?.comment;
          return member;
        });
        this.team = team;
        let rubricsCalifications = !!team.members[0]?.student?.evaluations[0]?.rubricsCalifications ? team.members[0]?.student?.evaluations[0]?.rubricsCalifications : null;
        this.evaluationForm.setValue({
          calification: !!team.members[0]?.student?.evaluations[0]?.calification ? team.members[0]?.student?.evaluations[0]?.calification : '',
          comment: !!team.comments[0]?.comment ? team.comments[0]?.comment : null,
          rubricsCalifications,
        });
        this.setRubricsEvaluations.emit(rubricsCalifications);
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  // ----------------------- Evaluate one student ----------------------- //

  GetStudent() {
    this.api.Get(`/Students/${this.studentId}/WithEvaluationsOf/ParcialProduct/${this.parcialProductId}`).subscribe(student => {
      this.student = student;
      this.studentFiles = (student.evaluations[0]?.studentFiles || []).map((file: any) => {
        file.owner = student;
        return file;
      });
      this.crumbs.push({ name: `${this.BuildStudentFullName(student)}`, route: null });
      let rubricsCalifications = !!student?.evaluations[0]?.rubricsCalifications ? student?.evaluations[0]?.rubricsCalifications : null;
      this.evaluationForm.setValue({
        calification: !!student?.evaluations[0]?.calification ? student?.evaluations[0]?.calification : '',
        comment: !!student?.evaluations[0]?.comment ? student?.evaluations[0]?.comment : null,
        rubricsCalifications,
      });
      this.setRubricsEvaluations.emit(rubricsCalifications);
    });
  }

  OnRubricsEvaluateRubric(data: any) {
    this.evaluationForm.get('calification')?.setValue(this.CalculateNumericCalification(data.maxCalification, data.calification));
    this.evaluationForm.get('rubricsCalifications')?.setValue(data.rubricsCalifications);
  }

  SaveEvaluation() {
    if(this.evaluationForm.invalid) {
      this.toast.ShowWarning(`Debe de ingresar una calificacion`);
      return;
    }
    let evaluation = this.evaluationForm.value;
    evaluation.calification = this.CalculateNumericCalification(this.parcialProduct?.maxCalification, evaluation.calification)
    evaluation.parcialProductId = this.parcialProductId;
    if(!!this.teamId) {
      evaluation.members = this.team.members;
      this.api.Patch(`/Teams/${this.teamId}/Evaluate/ParcialProduct/${this.parcialProductId}`, {evaluation}).subscribe(evaluated => {
        this.toast.ShowSuccess(`Evaluación guardada correctamente`);
      }, err => {
        console.error("Error saving team evaluation", err);
      });
    }
    else {
      this.api.Patch(`/Students/${this.studentId}/Evaluate/ParcialProduct/${this.parcialProductId}`, {evaluation}).subscribe(evaluated => {
        this.toast.ShowSuccess(`Evaluación guardada correctamente`);
      });
    }
  }

}
