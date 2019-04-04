
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  procesando : boolean = false
	captcha : boolean = false
	pass : string
  passConf : string
  passwordForgotten: boolean = false;

  constructor( vcr: ViewContainerRef, private router: Router, private api: ApiService, public toastr: ToastService) {
  }

  
  ngOnInit() {
  }
  registrarUsuario(user,valid,registerForm)	{
   
    if(!valid){
			this.toastr.showError("Completar los datos");
			console.log("sin datos");
			return
    }else if(user.user.password != user.user.passwordConfirm){
			this.toastr.showError("Las contraseñas no coinciden");
			console.log("sin datos");
			return
		}
    if(user.user.type=='Administrador'){
      this.api.post("/Usuarios/registerAdminis", user.user, false).subscribe((resp: any) =>{
        console.log(resp);
        this.toastr.showSuccess("Se genero correctamente el usuario.");
        registerForm.reset();
      },err=>{
        this.toastr.showError(err.error.error.message);
      });
    }
    if(user.user.type=='Usuario')
		{
      this.api.post("/Usuarios/register", user.user, false).subscribe((resp: any) =>{
        console.log(resp);
        this.toastr.showSuccess("Se genero correctamente el usuario.");
        registerForm.reset();
      },err=>{
        this.toastr.showError(err.error.error.message);
    });
    }

	}

}
