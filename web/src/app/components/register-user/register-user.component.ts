
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
  Roles:any;
  type="";
  constructor( vcr: ViewContainerRef, private router: Router, private api: ApiService, public toastr: ToastService) {
  }

  
  ngOnInit() {
    this.api.get("/Usuarios/getRoles",true).subscribe(roles=>{
      console.log(roles);
      this.Roles=roles;
      
    })
  }
  registrarUsuario(user,valid,registerForm)	{
   console.log(user.user.type);
   
    if(!valid){
			this.toastr.showError("Completar los datos");
			console.log("sin datos");
			return
    }else if(user.user.password != user.user.passwordConfirm){
			this.toastr.showError("Las contraseñas no coinciden");
			console.log("sin datos");
			return
		}
   
      this.api.post("/Usuarios/registerAdminis", user.user, false).subscribe((resp: any) =>{
        console.log(resp);
        this.toastr.showSuccess("Se genero correctamente el usuario.");
        registerForm.reset();
      },err=>{
        this.toastr.showError(err.error.error.details.messages.email);
      });
  
	}

}
