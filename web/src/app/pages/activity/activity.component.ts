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

  eventId: string | null = null;
  event: any = null;
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
      this.eventId = params['activityId'];

      this.GetEvent();
    });
  }

  GetEvent() {
    this.api.Get(`/Events/${this.eventId}`).subscribe(event => {
      this.event = event;
    }, err => {
      console.error("Error getting parcial product", err);
    });
  }

  GetEventDetails(): {icon: string, type: string, title: string, instructions: string} {
    let details: {icon: string, type: string, title: string, instructions: string} = {
      icon: 'activity.png',
      type: 'Actividad',
      title: 'Título',
      instructions: 'Instrucciones',
    }
    if(this.event?.isFinal) {
      details.icon = 'event.png';
      details.type = `Evento de cierre`;
      details.title = this.event?.name;
      details.instructions = this.event?.instructions;
    }
    else if(this.event?.parcialProduct?.isFinal) {
      details.icon = 'final-product.png';
      details.type = `Producto final`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }
    else if(this.event?.parcialProduct?.isActivity) {
      details.icon = 'activity.png';
      details.type = `Actividad`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }
    else {
      details.icon = 'parcial-product.png';
      details.type = `Producto parcial`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }

    return details;
  }

}
