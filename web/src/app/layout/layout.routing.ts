import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthSuserGuard } from '../services/auth-suser.guard';

export const ADMIN_MENU_PAGES: any = {
  'Admin': [
    { name: 'Inicio', action: '/inicio/admin/dashboard', icon: 'zmdi zmdi-home' },
  ],
  'SuperUser': [
    { name: 'Registrar Usuario', action: '/inicio/super-usuario/registro', icon: 'zmdi zmdi-account-add' },
    { name: 'Usuarios', action: '/inicio/super-usuario/usuarios', icon: 'accounts' },
  ],
  'User': [
    { name: 'Inicio', action: '/inicio/user/dashboard', icon: 'zmdi zmdi-home' },
  ],
  'School': [
    { name: 'Inicio', action: '/inicio/school/home', icon: 'zmdi zmdi-home' },
    { name: 'Maestros', action: '/inicio/school/registrar-maestros/csv', icon: 'zmdi zmdi-home' },
    { name: 'Estudiantes', action: '/inicio/school/registrar-estudiantes/csv', icon: 'zmdi zmdi-home' },
  ],
  'Teacher': [
    { name: 'Inicio', action: '/inicio/teacher/home', icon: 'zmdi zmdi-home' },
  ]
};


const LAYOUT_ROUTES: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
      { path: 'perfil', canActivate: [AuthGuard], loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule) },
      {
        path: 'user', canActivate: [AuthGuard], data: { role: 'User' },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
      },
      {
        path: 'admin', canActivate: [AuthGuard], data: { role: 'Admin' },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
      },
      {
        path: 'superuser', canActivate: [AuthSuserGuard], data: { role: 'SuperUser' },
        children: [
          { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
          { path: 'registro', loadChildren: () => import('../pages/register-user/register-user.module').then(m => m.RegisterUserModule) },
          { path: 'usuarios', loadChildren: () => import('../pages/super-user/users/users.module').then(m => m.UsersModule) }
        ]
      },
      {
        path: 'school', canActivate: [AuthGuard], data: { role: 'School' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'registrar-maestros', loadChildren: () => import('../pages/school-teachers/school-teachers.module').then(m => m.SchoolTeachersModule) },
          { path: 'registrar-maestros/csv', loadChildren: () => import('../pages/teachers-csv/teachers-csv.module').then(m => m.TeachersCsvModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
        ]
      },
      {
        path: 'teacher', canActivate: [AuthGuard], data: { role: 'Teacher' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
        ]
      },
    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
