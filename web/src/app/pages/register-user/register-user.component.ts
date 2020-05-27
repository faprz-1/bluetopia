
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
    this.api.Get("/Usuarios/getRoles",true).subscribe(roles=>{
      this.Roles=roles;

    })
  }
  registrarUsuario(user,valid,registerForm)	{

    if(!valid){
			this.toastr.ShowError("Completar los datos");
			return
    }else if(user.user.password != user.user.passwordConfirm){
			this.toastr.ShowError("Las contraseñas no coinciden");
			return
		}

      this.api.Post("/Usuarios/registerAdmins", user.user, false).subscribe((resp: any) =>{
        this.toastr.ShowSuccess("Se genero correctamente el usuario.");
        registerForm.reset();
      },err=>{
        this.toastr.ShowError(err.error.error.details.messages.email);
      });

	}

}