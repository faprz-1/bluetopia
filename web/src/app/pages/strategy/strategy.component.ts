import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  strategyId: any = null;
  strategy: any = null;
  loading: any = {
    getting: true
  };
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
    subjects: new FormControl([], Validators.required),
    dates: new FormControl(null, Validators.required),
  });

  public get strategyGroup() {
    if(!!this.strategy?.strategyGroup?.group && !!this.strategy?.strategyGroup?.grade) {
      return `${this.strategy?.strategyGroup?.grade.name}° ${this.strategy?.strategyGroup?.group.name}`
    }
    return ``;
  }
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
    ) { }
    
    ngOnInit(): void {
      this.GetParams();
    }

    GoBack() {
      this.nav.GoToUserRoute(`mis-estrategias`);
    }
    
    GetParams() {
      this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];

      this.GetStrategy();
    })
  }
  
  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      this.loading.getting = false;
    }, err => {
      console.error("Error getting strategy data", err);
      this.loading.getting = false;
    });
  }
  
  InitializeFormData() {
    this.strategyForm.setValue({
      id: !!this.strategy.id ? this.strategy.id : null,
      topic: !!this.strategy.topic ? this.strategy.topic : null,
      title: !!this.strategy.title ? this.strategy.title : null,
      generatingQuestion: !!this.strategy.generatingQuestion ? this.strategy.generatingQuestion : null,
      subjects: !!this.strategy.subjects ? this.strategy.subjects : [],
      dates: !!this.strategy.dates ? this.strategy.dates : null,
    })
  }

}
