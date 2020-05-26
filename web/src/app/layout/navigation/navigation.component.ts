import { Component, OnInit} from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { ApiService } from '../../services/api.service';
import { MessagingService } from '../../services/messaging.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                opacity: '0'
            })),
            state('active', style({
                height: '*',
                opacity: '1'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ])
    ]
})

export class NavigationComponent implements OnInit {
  sidebarVisible: boolean;

  // Sub menu visibilities
  navigationSubState: any = {
    Tables: 'inactive',
    Forms: 'inactive',
    SamplePages: 'inactive',
    UserInterface: 'inactive',
    Components: 'inactive',
    Charts: 'inactive',
  };

  user: any = {
    "username": "Usuario"
  };

  // Toggle sub menu
  toggleNavigationSub(menu, event) {
    event.preventDefault();
    this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
  }

  constructor(private sharedService: SharedService, public api: ApiService, public messagingService: MessagingService, private router: Router) {
    sharedService.sidebarVisibilitySubject.subscribe((value) => {
      this.sidebarVisible = value;
    })
    this.sharedService.userProfileImageUpdated$.subscribe(user=>this.user.profileImage=user)
  }

  userPages = [
    {name: "Inicio",action: "/inicio/user/dashboard", icon: "zmdi zmdi-home"}
  ];

  adminPages = [
    {name: "Inicio",action: "/inicio/admin/dashboard", icon: "zmdi zmdi-home"},
    {name: "Reembolsos",action: "/inicio/admin/refounds", icon: "zmdi zmdi-money-off"}
  ];

  superUserPages = [
    {name:"Registrar Usuario", action: "/inicio/superuser/registro", icon: "zmdi zmdi-account-add"}, 
    {name: "Usuarios",  action: "/inicio/superuser/usuarios", icon : "accounts"}, 
  ];
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  cerrarSession() {
    this.api.Post('/Usuarios/logout', { tokens: localStorage.getItem("fireTokens") != null ? localStorage.getItem("fireTokens") : [] }, true).subscribe(() => {
      localStorage.clear();
    });
    localStorage.clear();
  }
  GoTo(link){
    
    this.router.navigate([link]);
    this.sharedService.toggleSidebarVisibilty();
  }
}
