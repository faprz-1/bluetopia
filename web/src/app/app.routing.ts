import { Routes, RouterModule } from '@angular/router';
import {LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';


const ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: 'login', loadChildren: './components/login/login.module#LoginModule'},
    { path: 'inicio', loadChildren: './layout/layout.module#LayoutModule' , canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(ROUTES);