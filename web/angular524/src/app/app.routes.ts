import { RouterModule, Routes } from '@angular/router';
import { CambiarComtrasenaComponent } from "./componentes/cambiar-comtrasena/cambiar-comtrasena.component";
import { LoginComponent } from "./componentes/login/login.component";
import { PerfilComponent } from "./componentes/perfil/perfil.component";
import { RecuperarContrasenaComponent } from "./componentes/recuperar-contrasena/recuperar-contrasena.component";
import { RegistrarseComponent } from "./componentes/registrarse/registrarse.component";
import { AdminComponent } from './componentes/admin/admin.component';
import { ADMIN_ROUTES } from './componentes/admin/admin.routes';
import { AuthGuard } from './services/auth.guard';


const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  { path: 'perfil/:id', component: PerfilComponent, canActivate:[AuthGuard] },
  { path: 'cambiarContrasena', component: CambiarComtrasenaComponent, canActivate:[AuthGuard] },
  { path: 'recuperarContrasena', component: RecuperarContrasenaComponent},
  { path: 'admin', component: AdminComponent, children:ADMIN_ROUTES, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
