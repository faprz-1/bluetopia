import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { CambiarComtrasenaComponent } from './componentes/cambiar-comtrasena/cambiar-comtrasena.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

import { APP_ROUTING } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    CambiarComtrasenaComponent,
    RecuperarContrasenaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
