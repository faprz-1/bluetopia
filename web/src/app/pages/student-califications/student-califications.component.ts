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
      if(!!this.strategies.length) this.strategies[0].active = true;
    }, err => {
      console.error('Error getting students strategies', err);
    });
  }

  SetStrategyAsActive(strategy: any) {
    this.strategies.forEach(strategy => strategy.active = false);
    strategy.active = true;
  }

  GetEvaluationDetails(evaluation: any): any {
    // let details: {icon: string, type: string} = {
    //   icon: 'activity.png',
    //   type: 'Actividad'
    // }
    // if(event?.isFinal) {
    //   details.icon = 'event.png';
    //   details.type = `Evento de cierre`
    // }
    // else if(event?.parcialProduct?.isFinal) {
    //   details.icon = 'final-product.png';
    //   details.type = `Producto final`
    // }
    // else if(event?.parcialProduct?.isActivity) {
    //   details.icon = 'activity.png';
    //   details.type = `Actividad`
    // }
    // else {
    //   details.icon = 'parcial-product.png';
    //   details.type = `Producto parcial`
    // }

    // return details;
  }

}
