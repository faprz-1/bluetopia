import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthSGuard } from '../services/authSuser.guard';


const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' },
        { path: 'perfil', loadChildren: '../components/profile/profile.module#ProfileModule' },
        { path: 'registro', loadChildren: '../components/register-user/register-user.module#RegisterUserModule',  canActivate: [AuthSGuard] },
        { path: 'usuarios', loadChildren: '../components/super-user/users/users.module#UsersModule',  canActivate: [AuthSGuard] }, 
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);