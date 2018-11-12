import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ready : boolean = true
  user : any

  constructor(private api : ApiService) { }

  ngOnInit() {
    this.api.get("/Usuarios/withCredentials", true).subscribe((userFromServer: any)=>{  
      localStorage.setItem("user", JSON.stringify(userFromServer))
      this.reload();
    })
  }

  reload() {
    this.ready = false;
    this.user = JSON.parse(localStorage.getItem("user"))
    this.ready = true;
  }

}
