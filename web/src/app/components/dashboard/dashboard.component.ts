import { Component, OnInit, TemplateRef} from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';

import {TooltipModule} from "ngx-tooltip";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {  
  
	constructor(private router: Router, private modalService: BsModalService) {}
  ngOnInit() {}
}
