import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cambiar-comtrasena',
  templateUrl: './cambiar-comtrasena.component.html',
  styleUrls: ['./cambiar-comtrasena.component.css']
})
export class CambiarComtrasenaComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem("user"))

  constructor( 
    private router: Router, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private api: ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  updatePswrd(data) {
    if(data.newPassword == data.repeatNewPassword){
      console.log(data);
      this.api.post("/Usuarios/change-password", {oldPassword: data.password, newPassword: data.newPassword}).subscribe(res => {
       this.router.navigate(['/perfil/']);
      }, err => {
        this.toastr.error("¡La contraseña actual es incorrecta!")
      })
    }else{
      this.toastr.error("¡Las contraseñas nuevas no coinciden!")
    }
  }

  goPerfil() {
    this.router.navigate(['/perfil/']);
  }

  showError(texto) {
    this.toastr.error(texto, 'Error:');
  }

}
