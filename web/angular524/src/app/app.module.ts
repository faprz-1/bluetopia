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

import { FacebookService } from './services/facebook.service';
import { UserService } from './services/user.service';
import { SocialLoginModule, AuthServiceConfig,
          GoogleLoginProvider, FacebookLoginProvider} from "angular5-social-login";

          export function getAuthServiceConfigs() {
            let config = new AuthServiceConfig(
                [
                  {
                    id: FacebookLoginProvider.PROVIDER_ID,
                    provider: new FacebookLoginProvider("2032394103667706")
                  },
                  {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("46992181928-7tgrlool25i5oena60neapeedc2lhsl2.apps.googleusercontent.com")
        },

                ] );
            return config;
          }


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
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [UserService, FacebookService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
