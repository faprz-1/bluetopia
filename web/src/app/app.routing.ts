import { Routes, RouterModule } from '@angular/router';
import {LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';


const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
    { path: 'verificacion/:code', loadChildren: () => import('./pages/email-verification/email-verification.module').then(m => m.EmailVerificationModule)},
    { path: 'inicio', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) , canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(ROUTES);