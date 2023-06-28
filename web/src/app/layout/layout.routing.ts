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
    { name: 'Mis maestros', action: '/inicio/school/mis-maestros', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis estudiantes', action: '/inicio/school/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
    { name: 'Datos de los alumnos', action: '/inicio/school/datos-estudiantes', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis estrategias', action: '/inicio/school/mis-estrategias', icon: 'zmdi zmdi-accounts' },
  ],
  'Teacher': [
    // { name: 'Inicio', action: '/inicio/teacher/home', icon: 'zmdi zmdi-home' },
    { name: 'Mis datos', action: '/inicio/teacher/perfil', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis Estudiantes', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts' },
    { name: 'Datos de los alumnos', action: '/inicio/teacher/datos-estudiantes', icon: 'zmdi zmdi-accounts' },
    { name: 'Mis Estrategias', action: '/inicio/teacher/mis-estrategias', icon: 'zmdi zmdi-accounts' },
    // { name: 'Mis Grupos', action: '/inicio/teacher/mis-asignaturas', icon: 'zmdi zmdi-assignment' },
  ],
  'Parent': [
    { name: 'Inicio', action: '/inicio/parent/home', icon: 'zmdi zmdi-home' },
    { name: 'Estadisticas', action: '/inicio/parent/estadisticas', icon: 'zmdi zmdi-accounts' },
  ],
  'Student': [
    { name: 'Inicio', action: '/inicio/student/home', icon: 'zmdi zmdi-home' },
    { name: 'Mis estadisticas', action: '/inicio/student/mis-estadisticas', icon: 'zmdi zmdi-accounts' },
  ],
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
          { path: 'datos-estudiantes', loadChildren: () => import('../pages/students-data/students-data.module').then(m => m.StudentsDataModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-maestros', loadChildren: () => import('../pages/teachers/teachers.module').then(m => m.TeachersModule) },
          { path: 'registrar-maestros/csv', loadChildren: () => import('../pages/teachers-csv/teachers-csv.module').then(m => m.TeachersCsvModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId/equipos', loadChildren: () => import('../pages/students-teams/students-teams.module').then(m => m.StudentsTeamsModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos', loadChildren: () => import('../pages/teams-progress/teams-progress.module').then(m => m.TeamsProgressModule) },
          { path: 'grado/:grade/grupo/:group/plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'grado/:grade/grupo/:group/tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'estrategias/:strategyId/materias', loadChildren: () => import('../pages/template-form/template-form.module').then(m => m.TemplateFormModule) },
          { path: 'estrategias/:strategyId', loadChildren: () => import('../pages/teacher-template-form/teacher-template-form.module').then(m => m.TeacherTemplateFormModule) },
          { path: 'estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'estrategias/:strategyId/calendario/nuevo-evento/:eventDate', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
        ]
      },
      {
        path: 'teacher', canActivate: [AuthGuard], data: { role: 'Teacher' },
        children: [
          { path: '', redirectTo: 'mis-estudiantes', pathMatch: 'full' },
          { path: 'perfil', loadChildren: () => import('../pages/teacher-profile/teacher-profile.module').then(m => m.TeacherProfileModule) },
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/teacher-students/teacher-students.module').then(m => m.TeacherStudentsModule) },
          { path: 'datos-estudiantes', loadChildren: () => import('../pages/students-data/students-data.module').then(m => m.StudentsDataModule) },
          { path: 'mis-asignaturas', loadChildren: () => import('../pages/teacher-subjects/teacher-subjects.module').then(m => m.TeacherSubjectsModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-estrategias/:strategyId', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId/equipos', loadChildren: () => import('../pages/students-teams/students-teams.module').then(m => m.StudentsTeamsModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos', loadChildren: () => import('../pages/teams-progress/teams-progress.module').then(m => m.TeamsProgressModule) },
          { path: 'grado/:grade/grupo/:group/plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'grado/:grade/grupo/:group/tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'plantillas/crear/:templateId', loadChildren: () => import('../pages/create-strategy/create-strategy.module').then(m => m.CreateStrategyModule) },
          { path: 'estrategias/:strategyId/materias', loadChildren: () => import('../pages/template-form/template-form.module').then(m => m.TemplateFormModule) },
          { path: 'estrategias/:strategyId', loadChildren: () => import('../pages/teacher-template-form/teacher-template-form.module').then(m => m.TeacherTemplateFormModule) },
          { path: 'estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'estrategias/:strategyId/calendario/nuevo-evento/:eventDate', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
        ]
      },
      {
        path: 'parent', canActivate: [AuthGuard], data: { role: 'Parent' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('../pages/parent-student-dashboard/parent-student-dashboard.module').then(m => m.ParentStudentDashboardModule) },
          { path: 'estadisticas', loadChildren: () => import('../pages/student-stats/student-stats.module').then(m => m.StudentStatsModule) },
        ]
      },
      {
        path: 'student', canActivate: [AuthGuard], data: { role: 'Student' },
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', loadChildren: () => import('../pages/parent-student-dashboard/parent-student-dashboard.module').then(m => m.ParentStudentDashboardModule) },
          { path: 'mis-estadisticas', loadChildren: () => import('../pages/student-stats/student-stats.module').then(m => m.StudentStatsModule) },
        ]
      },
    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
