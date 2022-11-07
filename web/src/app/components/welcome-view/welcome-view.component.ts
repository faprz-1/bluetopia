import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.component.html',
  styleUrls: ['./welcome-view.component.scss']
})
export class WelcomeViewComponent implements OnInit {

  constructor(
    private nav: NavigationService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  
  GoToAddTeachers() {
    const user = this.api.GetUser();
    this.nav.GoTo(`inicio/${user.role.name.toLowerCase()}/registrar-maestros`);
  }

  GoToAddTeachersByCsv() {
    const user = this.api.GetUser();
    this.nav.GoTo(`inicio/${user.role.name.toLowerCase()}/registrar-maestros/csv`);
  }

}
