import { Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { ApiService } from '../../services/api.service';

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
    navigationSubState:any = {
        Tables: 'inactive',
        Forms: 'inactive',
        SamplePages: 'inactive',
        UserInterface: 'inactive',
        Components: 'inactive',
        Charts: 'inactive',
    };


    user:any={"username":"Usuario"};
    medic:any=[];
    // Toggle sub menu
    toggleNavigationSub(menu, event) {
        event.preventDefault();
        this.navigationSubState[menu] = (this.navigationSubState[menu] === 'inactive' ? 'active' : 'inactive');
    }

    constructor(private sharedService: SharedService,public api :ApiService) {
        sharedService.sidebarVisibilitySubject.subscribe((value) => {
            this.sidebarVisible = value;
        })


    }

    userPages=[
        {name:"Inicio",action:"/inicio/dashboard"},
        {name:"Tikets",action:"/inicio/bug-report"}
        ];

    ngOnInit() {
         this.user = JSON.parse(localStorage.getItem('user'));
    }
    cerrarSession(){
        this.api.post('/Usuarios/logout',{},true).subscribe(()=>{
            localStorage.clear();
        });
         localStorage.clear();

    }
}