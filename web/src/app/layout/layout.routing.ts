import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../services/auth.guard';
import { AuthSuserGuard } from '../services/auth-suser.guard';

export const ADMIN_MENU_PAGES: any = {
  'Admin': [
    { name: 'Inicio', action: '/inicio/admin/dashboard', icon: 'zmdi zmdi-home' },
  ],
  'SuperUser': [
    // { name: 'Registrar Usuario', action: '/inicio/superuser/registro', icon: 'zmdi zmdi-account-add' },
    { name: 'Usuarios', action: '/inicio/superuser/usuarios', icon: 'accounts' },
  ],
  'User': [
    { name: 'Inicio', action: '/inicio/user/dashboard', icon: 'zmdi zmdi-home' },
  ],
  'School': [
    // { name: 'Inicio', action: '/inicio/school/home', icon: 'zmdi zmdi-home' },
    { name: 'Mis Maestros', action: '/inicio/school/mis-maestros', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis Estudiantes', action: '/inicio/school/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
  ],
  'Teacher': [
    // { name: 'Inicio', action: '/inicio/teacher/home', icon: 'zmdi zmdi-home' },
    { name: 'Mis Estudiantes', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis Estrategias', action: '/inicio/teacher/mis-estrategias', icon: 'zmdi zmdi-accounts' },
    // { name: 'Mis Grupos', action: '/inicio/teacher/mis-asignaturas', icon: 'zmdi zmdi-assignment' },
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
          // { path: 'registro', loadChildren: () => import('../pages/register-user/register-user.module').then(m => m.RegisterUserModule) },
          { path: 'usuarios', loadChildren: () => import('../pages/super-user/users/users.module').then(m => m.UsersModule) }
        ]
      },
      {
        path: 'school', canActivate: [AuthGuard], data: { role: 'School' },
        children: [
          { path: '', redirectTo: 'mis-maestros', pathMatch: 'full' },
          { path: 'registrar-maestros', loadChildren: () => import('../pages/school-teachers/school-teachers.module').then(m => m.SchoolTeachersModule) },
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-maestros', loadChildren: () => import('../pages/teachers/teachers.module').then(m => m.TeachersModule) },
          { path: 'registrar-maestros/csv', loadChildren: () => import('../pages/teachers-csv/teachers-csv.module').then(m => m.TeachersCsvModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'grado/:grade/grupo/:group/plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'grado/:grade/grupo/:group/tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId', loadChildren: () => import('../pages/template-form/template-form.module').then(m => m.TemplateFormModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId', loadChildren: () => import('../pages/teacher-template-form/teacher-template-form.module').then(m => m.TeacherTemplateFormModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId/calendario/nuevo-evento/:eventDate', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
        ]
      },
      {
        path: 'teacher', canActivate: [AuthGuard], data: { role: 'Teacher' },
        children: [
          { path: '', redirectTo: 'mis-estudiantes', pathMatch: 'full' },
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/teacher-students/teacher-students.module').then(m => m.TeacherStudentsModule) },
          { path: 'mis-asignaturas', loadChildren: () => import('../pages/teacher-subjects/teacher-subjects.module').then(m => m.TeacherSubjectsModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'grado/:grade/grupo/:group/plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'grado/:grade/grupo/:group/tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId', loadChildren: () => import('../pages/template-form/template-form.module').then(m => m.TemplateFormModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId', loadChildren: () => import('../pages/teacher-template-form/teacher-template-form.module').then(m => m.TeacherTemplateFormModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'grado/:grade/grupo/:group/plantillas/:templateId/estrategias/:strategyId/calendario/nuevo-evento/:eventDate', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
        ]
      },
    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
