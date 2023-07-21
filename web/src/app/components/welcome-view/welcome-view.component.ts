import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrls: ['./welcome-view.component.scss']
})
export class WelcomeViewComponent implements OnInit {

  @Input() userType: string = '';

  public get text1() {
    switch (this.userType) {
      case 'maestro': return 'Aquí podrás diseñar estrategias de aprendizaje paso a paso, también podrás consultar y usar estrategias ya creadas.';
      default: return 'En esta plataforma tus docentes podrán crear sus estrategias rápida y ordenadamente.';
    }
  }
  public get text2() {
    switch (this.userType) {
      case 'maestro': return 'De forma acompañada lograrás reinventar tus clases.';
      default: return 'Tus alumnos se podrán conectar con el profesor y recibir y subir sus tareas.';
    }
  }
  public get text3() {
    switch (this.userType) {
      case 'maestro': return 'Y será sencillo planear';
      default: return 'Tus padres de familia podrán estar al tanto de todo lo que su hijo esta realizando y ver sus trabajos así como compratirlos en redes sociales.';
    }
  }
  public get text4() {
    switch (this.userType) {
      case 'maestro': return 'Comienza registrando a tus alumnos';
      default: return 'Comienza registrando a tus maestros';
    }
  }

  constructor(
    public nav: NavigationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  
  GoToAddTeachers() {
    const user = this.api.GetUser();
    this.nav.GoTo(`inicio/${user.role.name.toLowerCase()}/registrar-maestros`);
  }

  GoToAddByCsv() {
    const user = this.api.GetUser();
    let route = `inicio/${user.role.name.toLowerCase()}`;
    switch (user.role.name) {
      case 'Teacher': route += `/registrar-estudiantes`; break;
      default: route += `/registrar-maestros`; break;
    }
    console.log(route);
    this.nav.GoTo(`${route}/csv`);
  }

}
