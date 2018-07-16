import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import {TooltipModule} from "ngx-tooltip";
import { BugsService } from '../../services/bugs.service';
import { BugsReportComponent } from "./bugs-report.component";
// import { FilterPipe } from '../../filter.pipe';


const MODULE_ROUTES = [
    { path: '', component: BugsReportComponent }
];

@NgModule({
  imports: [
    CommonModule ,
    FormsModule,
    // TooltipModule,
    RouterModule.forChild(MODULE_ROUTES)
  ] ,
  providers:[
  	BugsService
  ],
  declarations: [BugsReportComponent
  // ,FilterPipe
  ]
})
export class BugsReportModule { }


