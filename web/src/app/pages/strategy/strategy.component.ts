import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {

  @ViewChild('templateTopicSelect') templateTopicSelect?: NgSelectComponent;

  strategyId: any = null;
  strategy: any = null;
  templateTopics: Array<any> = [];
  loading: any = {
    getting: true
  };
  strategyForm: FormGroup = new FormGroup({
    id: new FormControl(null, []),
    topic: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    generatingQuestion: new FormControl(null, [Validators.required]),
    subjects: new FormControl([], Validators.required),
  });

  public get strategyGroup() {
    if(!!this.strategy?.strategyGroup?.group && !!this.strategy?.strategyGroup?.grade) {
      return `${this.strategy?.strategyGroup?.grade.name}°${this.strategy?.strategyGroup?.group.name}`
    }
    return `Sin grupo`;
  }
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toast: ToastService,
    private nav: NavigationService
    ) { }
    
    ngOnInit(): void {
      this.GetTemplateTopics();
      this.GetParams();
    }

    GoBack() {
      this.nav.GoToUserRoute(`mis-estrategias`);
    }
    
    GetParams() {
      this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];

      this.GetStrategy();
    });
  }
  
  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(strategy => {
      this.strategy = strategy;
      this.InitializeFormData();
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
    });
  }

  GetTemplateTopics() {
    this.api.Get(`/TemplateTopics`).subscribe(
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
    };
    let control = this.strategyForm.get('topic');
    this.loading.templateTopic = true;
    control?.disable();
    this.api.Post(`/TemplateTopics`, { templateTopic: templateTopicObj }).subscribe((newTemplateTopic) => {
      this.templateTopics = this.templateTopics.concat([newTemplateTopic]);
      control?.setValue(newTemplateTopic.name);
      this.loading.templateTopic = false;
      control?.enable();
      this.templateTopicSelect?.close();
    }, (err) => {
      console.error('Error creatong templateTopic', err);
      this.loading.templateTopic = false;
      control?.enable();
      }
    );
  };

  GoToEditDetails(){
    // plantillas/1/crear/2
    this.nav.GoToUserRoute('plantillas/' + this.strategy.templateId + '/crear/'+this.strategy.id);
  }

  
  SaveStrategy() {
    return new Promise<boolean>((res, rej) => {
      let strategy = this.strategyForm.value;
      this.api.Patch(`/Strategies/${this.strategyId}`, { strategy }).subscribe(
          (strategySaved) => {
            this.strategy = strategySaved;
            this.InitializeFormData();
            this.toast.ShowSuccess('Cambios guardados correctamente');
            res(true);
          },
          (err) => {
            this.toast.ShowError('Error al guardar cambios, intente nuevamente');

            console.error('Error updating strategy', err);
            res(false);
          }
        );
    });
  }

}
