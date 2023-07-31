import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rubric-tutorial-modal',
  templateUrl: './rubric-tutorial-modal.component.html',
  styleUrls: ['./rubric-tutorial-modal.component.scss']
})
export class RubricTutorialModalComponent implements OnInit {

  @ViewChild('rubricTutorialModal') modal: any;

  rubrics1: Array<any> = [
    {
      description: 'Descripción',
      concepts: [
        {
          value: '4',
          description: 'Incluimos todas las palabras clave: sobrepeso, obesidad, índice de masa corporal, agua.'
        },
        {
          value: '3',
          description: 'Incluimos algunas de las palabra clave, nos faltaron una o dos'
        },
        {
          value: '2',
          description: 'Nos faltaron casi todas las palabras, sólo incluimos una de ellas.'
        },
        {
          value: '1',
          description: 'No incluimos ninguna palabra clave'
        },
      ]
    }
  ];
  rubrics2: Array<any> = [
    {
      description: 'Análisis del entorno',
      concepts: [
        {
          value: '4',
          description: 'Tomó en cuenta el impacto ambiental, social y económico en la propuesta'
        },
        {
          value: '3',
          description: 'Tomó en cuenta el impacto ambiental y social en la propuesta'
        },
        {
          value: '2',
          description: 'Tomó en cuenta el impacto ambiental en su propuesta'
        },
        {
          value: '1',
          description: 'No tomó en cuenta el impacto de su propuesta en el área comercial seleccionada'
        },
      ]
    },
    {
      description: 'Trabajo en equipo',
      concepts: [
        {
          value: '4',
          description: 'Participa activamente en las tareas propuestas y colabora con los demás'
        },
        {
          value: '3',
          description: 'Casi todos los miembros del equipo han asumido sus tareas de forma responsable'
        },
        {
          value: '2',
          description: 'Sólo algunos miembros del equipo han asumido sus tareas de forma responsable'
        },
        {
          value: '1',
          description: 'Solo un miembro del equipo (o ninguno) participa activamente en las tareas propuestas '
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public OpenModal() {
    this.modal?.show();
  }

  public CloseModal() {
    this.modal?.hide()
  }

}
