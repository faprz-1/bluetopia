import { Component, OnInit } from '@angular/core';
import { BugsService } from '../../services/bugs.service';

@Component({
  selector: 'app-bugs-report',
  templateUrl: './bugs-report.component.html',
  styleUrls: ['./bugs-report.component.scss']
})
export class BugsReportComponent implements OnInit {
  proyecto_id:any;
  proyecto:any;
  nuevoBug:any={"tipo":0,"prioridad":5};
  tipos:any=["Bug",
"Nueva funcionalidad",
"Nuevo modulo"]
  constructor(private bugService:BugsService) { 
  	this.proyecto_id=1;
  	this.cargarProyecto(this.proyecto_id);
  }

  cargarProyecto(id){
  	this.bugService.getProyectBugs(id).subscribe(
  		(data)=>{
  			this.proyecto = data;
  		},
  		(error)=>{}
  		);
  }

  addBug(){
  	console.log(this.nuevoBug);
    this.bugService.addBug(this.proyecto_id,this.nuevoBug).subscribe((data)=>{
      console.log(data);
      this.cargarProyecto(this.proyecto_id);
    },(error)=>{
      console.log("error",error);
    })
    this.nuevoBug={"tipo":0,"prioridad":5};
  }
  ngOnInit() {
  }

}
