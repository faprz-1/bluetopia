import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthSGuard } from '../services/authSuser.guard';

export const ADMIN_MENU_PAGES = {
  'Admin': [
    {name: 'Inicio',action: '/inicio/admin/dashboard', icon: 'zmdi zmdi-home'},
    {name: 'Reembolsos',action: '/inicio/admin/refunds', icon: 'zmdi zmdi-money-off'}
  ],
  'SuperUser': [
    {name: 'Registrar Usuario', action: '/inicio/super-usuario/registro', icon: 'zmdi zmdi-account-add'},
    {name: 'Usuarios', action: '/inicio/super-usuario/usuarios', icon : 'accounts'}
  ],
  'User': [
    {name: 'Inicio',action: '/inicio/user/dashboard', icon: 'zmdi zmdi-home'}
  ]
};


const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: 'perfil', loadChildren: '../pages/profile/profile.module#ProfileModule' },
        { path: 'user',  canActivate: [AuthGuard],  data: {role : 'User'},
    	children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' }
        ]},
        { path: 'admin',  canActivate: [AuthGuard],  data: {role : 'Admin'},
    	children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
                { path: 'refunds', loadChildren: '../pages/admin/refunds/refunds.module#RefundsModule' }
        ]},
        { path: 'superuser',  canActivate: [AuthGuard],  data: {role : 'SuperUser'},
    	children: [
                { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
                { path: 'registro', loadChildren: '../pages/register-user/register-user.module#RegisterUserModule' },
                { path: 'usuarios', loadChildren: '../pages/super-user/users/users.module#UsersModule' }
        ]}
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
