import { Component, OnInit, TemplateRef} from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
	constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastService
    ) {}
  ngOnInit() {}

}
