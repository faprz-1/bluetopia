import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-student-event-card',
  templateUrl: './student-event-card.component.html',
  styleUrls: ['./student-event-card.component.scss']
})
export class StudentEventCardComponent implements OnInit {

  @Input() event: any = null;

  constructor(
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
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
      details.title = this.event.name;
      details.instructions = this.event.instructions;
    }
    else if(this.event?.parcialProduct?.isFinal) {
      details.icon = 'final-product.png';
      details.type = `Producto final`;
      details.title = this.event.parcialProduct.name;
      details.instructions = this.event.parcialProduct.instructions;
    }
    else if(this.event?.parcialProduct?.isActivity) {
      details.icon = 'activity.png';
      details.type = `Actividad`;
      details.title = this.event.parcialProduct.name;
      details.instructions = this.event.parcialProduct.instructions;
    }
    else {
      details.icon = 'parcial-product.png';
      details.type = `Producto parcial`;
      details.title = this.event.parcialProduct.name;
      details.instructions = this.event.parcialProduct.instructions;
    }

    return details;
  }

  GoToDetails() {
    this.nav.GoToUserRoute(`mis-actividades/detalle-de-actividad/${this.event.id}`);
  }

}
