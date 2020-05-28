import { Component, OnInit} from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { ApiService } from '../../services/api.service';
import { MessagingService } from '../../services/messaging.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';

import { ADMIN_MENU_PAGES } from '../layout.routing';

class UserPage {
  public name: string;
  public action: string;
  public icon: string;
}

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
    'username': 'Usuario'
  };

  public activeUserPages: UserPage[] = [];

  // Toggle sub menu
  toggleNavigationSub(menu, event) {
    event.preventDefault();
    this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
  }

  constructor(
    private sharedService: SharedService,
    public api: ApiService,
    public messagingService: MessagingService,
    private router: Router
  )
  {
    sharedService.sidebarVisibilitySubject.subscribe((value) => {
      this.sidebarVisible = value;
    })
    this.sharedService.userProfileImageUpdated$.subscribe(user=>this.user.profileImage=user)
  }

  ngOnInit() {
    this.user = this.user = this.api.GetUser();
    this.activeUserPages = ADMIN_MENU_PAGES[this.user.role.name] ? ADMIN_MENU_PAGES[this.user.role.name] : [];
  }

  LogOut()
  {
    const data = {
      tokens: localStorage.getItem('fireTokens') != null ? localStorage.getItem('fireTokens') : []
    };

    this.api.Post('/Usuarios/logout', data, true).subscribe(() => {});
    localStorage.clear();
    this.router.navigate(['/']);
  }

  GoTo(link)
  {
    this.router.navigate([link]);
    this.sharedService.toggleSidebarVisibilty();
  }
}
