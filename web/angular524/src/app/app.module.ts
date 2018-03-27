import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { CambiarComtrasenaComponent } from './componentes/cambiar-comtrasena/cambiar-comtrasena.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

import { UserService } from './services/user.service';

import { APP_ROUTING } from './app.routes';
import { UsersListComponent } from './componentes/admin/users-list/users-list.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { UserEditComponent } from './componentes/admin/user-edit/user-edit.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    CambiarComtrasenaComponent,
    RecuperarContrasenaComponent,
    PerfilComponent,
    UsersListComponent,
    AdminComponent,
    UserEditComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
