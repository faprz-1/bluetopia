import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates: Array<any> = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.GetTemplates();
  }

  GetTemplates() {
    this.api.Get(`/Templates`).subscribe(templates => {
      this.templates = templates;
    }, err => {
      console.error("Erro getting templates", err);
    });
  }

  CreateStrategyBasedOnTemplate(template: any) {
    
  }

}
