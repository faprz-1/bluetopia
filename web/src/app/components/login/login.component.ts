import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { NotificationService } from '../../services/notification.service';

import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public procesando: boolean = false;
  constructor(
    vcr: ViewContainerRef,
    public toast: ToastService,
    private router: Router, 
    private api: ApiService,
    private notiServ : NotificationService
  ) {
    if(localStorage.getItem("token")) {
      this.router.navigate(['/inicio/dashboard'])
    }
  }

  ngOnInit() {
    if (localStorage.getItem('cambio')) {
      localStorage.clear();
    }
    if (localStorage.getItem('creado')) {
      localStorage.clear();
    }
  }

  login(user) {
    this.procesando = true
    this.api.post("/Usuarios/login", user, false).subscribe((token: any) =>{
      localStorage.clear()
      localStorage.setItem("token",token.id)
      this.api.token= token.id;
      this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{
        this.procesando = false;
        localStorage.setItem("user", JSON.stringify(userFromServer));
        localStorage.setItem("ttl", moment().add(1209600, 's').toISOString() )
        this.notiServ.loadNotifications()
        this.toast.showSuccess("Sesion Iniciada Exitosamente");
        this.router.navigate(['/inicio/dashboard']);
      })
    }, (err: any) => {
      this.procesando = false;
      this.toast.showError(err.error.error.message);
    })
  }
}
