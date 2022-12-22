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
    { name: 'Mis Maestros', action: '/inicio/school/mis-maestros', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis Estudiantes', action: '/inicio/school/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
  ],
  'Teacher': [
    { name: 'Inicio', action: '/inicio/teacher/home', icon: 'zmdi zmdi-home' },
    { name: 'Mis Estudiantes', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
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
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-maestros', loadChildren: () => import('../pages/teachers/teachers.module').then(m => m.TeachersModule) },
          { path: 'registrar-maestros/csv', loadChildren: () => import('../pages/teachers-csv/teachers-csv.module').then(m => m.TeachersCsvModule) },
        ]
      },
      {
        path: 'teacher', canActivate: [AuthGuard], data: { role: 'Teacher' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/teacher-students/teacher-students.module').then(m => m.TeacherStudentsModule) },
        ]
      },
    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
