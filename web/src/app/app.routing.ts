import { Routes, RouterModule } from '@angular/router';
import {LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';


const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
    { path: 'verificacion/:code', loadChildren: './pages/email-verification/email-verification.module#EmailVerificationModule'},
    { path: 'inicio', loadChildren: './layout/layout.module#LayoutModule' , canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(ROUTES);