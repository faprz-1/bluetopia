import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-califications',
  templateUrl: './student-califications.component.html',
  styleUrls: ['./student-califications.component.scss']
})
export class StudentCalificationsComponent implements OnInit {

  strategies: Array<any> = [];
  evaluations: Array<any> = [];
  crumbs: Array<any> = [
    {name: 'Volver al inicio', route: '/home'}
  ]

  activeStrategy:any = null;
  constructor(
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetStudentStrategies();
  }

  GetStudentStrategies() {
    this.api.Get(`/Strategies/OfStudent`).subscribe(strategies => {
      this.strategies = strategies;
    }, err => {
      console.error('Error getting students strategies', err);
    });
  }

  SetStrategyAsActive(strategySelected: any) {
    this.strategies.forEach(strategy => {
      strategy.active = strategy.id == strategySelected.id;
    });
    this.activeStrategy = strategySelected;
    this.GetEvaluationDetails(strategySelected);
  }
  

  GetEvaluationDetails(strategy:any): any {
    var user = this.api.GetUser();
    this.api.Get(`/Evaluations/of/${user.student.id}/in/${strategy.id}`).subscribe((result)=>{
      this.evaluations = result;      
    });
  }

}
