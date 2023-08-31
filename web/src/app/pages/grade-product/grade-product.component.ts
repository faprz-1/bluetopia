import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-grade-product',
  templateUrl: './grade-product.component.html',
  styleUrls: ['./grade-product.component.scss']
})
export class GradeProductComponent implements OnInit {

  strategyId: any;
  studentId: any;
  teamId: any;
  parcialProductId: any;
  strategy: any = null;
  student: any = null;
  team: any = null;
  parcialProduct: any = null;
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Evaluar', route: null},
  ];
  evaluationForm: FormGroup = new FormGroup({
    calification: new FormControl(null, [ValidationService.CheckOnlyIntegerNumbers]),
    comments: new FormControl(null, []),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  BuildStudentFullName(student: any): string {
    if(!!student) return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
    return '';
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.studentId = params['studentId'];
      this.teamId = params['teamId'];
      this.parcialProductId = params['parcialProductId'];
      this.GetStrategy();
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
        if(!!strategy.teams?.length) {
          this.team = strategy.teams.find((team: any) => team.id == this.teamId);
        }
        if(!!strategy.parcialProducts?.length) {
          this.parcialProduct = strategy.parcialProducts.find((pp: any) => pp.id == this.parcialProductId);
        }
      }, (err) => {
        console.error('Error getting strategy', err);
      }
    );
  }

  GetStudent() {
    this.api.Get(`/Students/${this.studentId}`).subscribe(student => {
      this.student = student;
      this.crumbs.push({ name: `${this.BuildStudentFullName(student)}`, route: null });
    });
  }

}
