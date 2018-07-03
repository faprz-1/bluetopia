import { Component, OnInit} from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { RouterModule, Routes ,Router} from '@angular/router';

import {TooltipModule} from "ngx-tooltip";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	checkUser:any=[];
  constructor(
  			private router: Router,
              private checklist : ChecklistService,
  	){
    this.salidas();
  }

  ngOnInit() {
  }
  addCheck(user){
    this.checklist.addCheck(user.id).subscribe((data)=>{
      console.log(data);
      user.checklistSalidas = [data];
    },(error)=>{
      console.log("error",error);
    })
  }
  salidas(){
    this.checklist.getAllSalida().subscribe((data)=>{
      console.log(data);
      this.checkUser = data;
      console.log(this.checkUser);
    },(error)=>{
      console.log("error",error);
    })
  }
  calcProgress(check){
    console.log(check);
    if(check==undefined){
      return 0;
    }else{

    let total=4;
    let progress=0;
    if(check.commit!=0)
      progress++;
    if(check.ortografia!=0)
      progress++;
    if(check.jira!=0)
      progress++;
    if(check.indentacion!=0)
      progress++;

    check.progress = progress;
    return progress;
    }
  }
  aumentar(check,type){
    if(confirm(`Estas seguro de aumentar el cotador de ${type}`)){

      switch(type){
        case "commit":
          check.commit ++;
        break;
        case "revision":
          check.ortografia ++;
        break;
        case "jira":
          check.jira ++;
        break;
        case "indentacion":
          check.indentacion ++;
        break;
      }
      this.syncCheck(check)
    }
    this.calcProgress(check);
    console.log(check);
  }
  syncCheck(check){
    this.checklist.aumentarContador(check).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log("error",error);
    });
  }
}
