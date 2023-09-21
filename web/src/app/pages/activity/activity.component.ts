import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  parcialProductId: string | null = null;
  parcialProduct: any = null;
  crumbs: Array<any> = [
    {name: 'Mis actividades', route: null},
    {name: 'Actividad 1', route: null},
  ]

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.parcialProductId = params['activityId'];

      this.GetActivityDetails();
    });
  }

  GetActivityDetails() {
    this.api.Get(`/ParcialProducts/${this.parcialProductId}`).subscribe(parcialProduct => {
      this.parcialProduct = parcialProduct;
      console.log(parcialProduct);
    }, err => {
      console.error("Error getting parcial product", err);
    });
  }

}
