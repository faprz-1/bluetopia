import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthSGuard } from '../services/authSuser.guard';


const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: 'perfil', loadChildren: '../components/profile/profile.module#ProfileModule' },
        { path: 'user',  canActivate: [AuthGuard],  data: {role : "User"},
    	children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' }
        ]},
        { path: 'admin',  canActivate: [AuthGuard],  data: {role : "Admin"},
    	children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' },
                { path: 'refounds', loadChildren: '../components/admin/refunds/refunds.module#RefundsModule' }
        ]},
        { path: 'superuser',  canActivate: [AuthGuard],  data: {role : "SuperUser"},
    	children: [
                { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
                { path: 'registro', loadChildren: '../components/register-user/register-user.module#RegisterUserModule' },
                { path: 'usuarios', loadChildren: '../components/super-user/users/users.module#UsersModule' }
        ]}         
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);