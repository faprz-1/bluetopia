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
    // { name: 'Mis datos', action: '/inicio/teacher/perfil', icon: 'zmdi zmdi-accounts', iconImg: 'home.svg' },
    { name: 'Inicio', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'home.svg' },
    { name: 'Mis Estrategias', action: '/inicio/teacher/mis-estrategias', icon: 'zmdi zmdi-accounts', iconImg: 'description.svg' },
    // { name: 'Progreso de alumnos', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'groups.svg' },
    // { name: 'Mis grados/grupos', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'groups.svg' },
    { name: 'Datos de los alumnos', action: '/inicio/teacher/datos-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'person-success.svg' },
    { name: 'Mis entregables favoritos*', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'star_rate.svg' },
    { name: 'Biblioteca de conocimiento*', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'import_contacts_success.svg' },
    // { name: 'Calificaciones', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'playlist_add_check.svg' },
    // { name: 'Calendario', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'calendar_month.svg' },
    { name: 'Gráficas de resultados*', action: '/inicio/teacher/mis-estudiantes', icon: 'zmdi zmdi-accounts', iconImg: 'bar_chart.svg' },
    // { name: 'Mis Grupos', action: '/inicio/teacher/mis-asignaturas', icon: 'zmdi zmdi-assignment' },
  ],
  'Parent': [
    { name: 'Inicio', action: '/inicio/parent/home', icon: 'zmdi zmdi-home' },
    { name: 'Estadisticas', action: '/inicio/parent/estadisticas', icon: 'zmdi zmdi-accounts' },
  ],
  'Student': [
    { name: 'Inicio', action: '/inicio/student/home', icon: 'zmdi zmdi-home', iconImg: 'home.svg' },
    { name: 'Mis estadisticas', action: '/inicio/student/mis-estadisticas', icon: 'zmdi zmdi-accounts', iconImg: 'groups.svg' },
    { name: 'Calendario', action: '/inicio/student/calendario', icon: 'zmdi zmdi-accounts', iconImg: 'calendar_month.svg' },
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
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule) },
          { path: 'datos-estudiantes', loadChildren: () => import('../pages/students-data/students-data.module').then(m => m.StudentsDataModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-maestros', loadChildren: () => import('../pages/teachers/teachers.module').then(m => m.TeachersModule) },
          { path: 'registrar-maestros', loadChildren: () => import('../pages/school-teachers/school-teachers.module').then(m => m.SchoolTeachersModule) },
          { path: 'registrar-maestros/csv', loadChildren: () => import('../pages/teachers-csv/teachers-csv.module').then(m => m.TeachersCsvModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId', loadChildren: () => import('../pages/strategy/strategy.module').then(m => m.StrategyModule) },
          { path: 'mis-estrategias/:strategyId/equipos', loadChildren: () => import('../pages/students-teams/students-teams.module').then(m => m.StudentsTeamsModule) },
          { path: 'mis-estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date/crear', loadChildren: () => import('../pages/create-event-or-product/create-event-or-product.module').then(m => m.CreateEventOrProductModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date/crear/actividad', loadChildren: () => import('../pages/create-activity/create-activity.module').then(m => m.CreateActivityModule) },
          { path: 'mis-estrategias/:strategyId/crear-equipos', loadChildren: () => import('../pages/create-strategy-teams/create-strategy-teams.module').then(m => m.CreateStrategyTeamsModule) },
          { path: 'mis-estrategias/:strategyId/asignar-roles', loadChildren: () => import('../pages/strategy-teams-roles/strategy-teams-roles.module').then(m => m.StrategyTeamsRolesModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos', loadChildren: () => import('../pages/strategy-teams-progress/strategy-teams-progress.module').then(m => m.StrategyTeamsProgressModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos/:teamId/evaluar/:parcialProductId', loadChildren: () => import('../pages/grade-product/grade-product.module').then(m => m.GradeProductModule) },
          { path: 'mis-estrategias/:strategyId/progreso-estudiantes/:studentId/evaluar/:parcialProductId', loadChildren: () => import('../pages/grade-product/grade-product.module').then(m => m.GradeProductModule) },
          { path: 'tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'plantillas/:templateId', loadChildren: () => import('../pages/create-strategy/create-strategy.module').then(m => m.CreateStrategyModule) },
          { path: 'plantillas/:templateId/crear/:strategyId', loadChildren: () => import('../pages/strategy-creation-form/strategy-creation-form.module').then(m => m.StrategyCreationFormModule) },
        ]
      },
      {
        path: 'teacher', canActivate: [AuthGuard], data: { role: 'Teacher' },
        children: [
          { path: '', redirectTo: 'mis-estudiantes', pathMatch: 'full' },
          { path: 'perfil', loadChildren: () => import('../pages/teacher-profile/teacher-profile.module').then(m => m.TeacherProfileModule) },
          { path: 'mis-estudiantes', loadChildren: () => import('../pages/teacher-students/teacher-students.module').then(m => m.TeacherStudentsModule) },
          { path: 'datos-estudiantes', loadChildren: () => import('../pages/students-data/students-data.module').then(m => m.StudentsDataModule) },
          { path: 'registrar-estudiantes/csv', loadChildren: () => import('../pages/students-csv/students-csv.module').then(m => m.StudentsCsvModule) },
          { path: 'mis-asignaturas', loadChildren: () => import('../pages/teacher-subjects/teacher-subjects.module').then(m => m.TeacherSubjectsModule) },
          { path: 'mis-estrategias', loadChildren: () => import('../pages/strategies/strategies.module').then(m => m.StrategiesModule) },
          { path: 'mis-estrategias/:strategyId', loadChildren: () => import('../pages/strategy/strategy.module').then(m => m.StrategyModule) },
          { path: 'mis-estrategias/:strategyId/equipos', loadChildren: () => import('../pages/students-teams/students-teams.module').then(m => m.StudentsTeamsModule) },
          { path: 'mis-estrategias/:strategyId/calendario', loadChildren: () => import('../pages/project-calendar/project-calendar.module').then(m => m.ProjectCalendarModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date', loadChildren: () => import('../pages/event-day/event-day.module').then(m => m.EventDayModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date/crear', loadChildren: () => import('../pages/create-event-or-product/create-event-or-product.module').then(m => m.CreateEventOrProductModule) },
          { path: 'mis-estrategias/:strategyId/calendario/:date/crear/actividad', loadChildren: () => import('../pages/create-activity/create-activity.module').then(m => m.CreateActivityModule) },
          { path: 'mis-estrategias/:strategyId/crear-equipos', loadChildren: () => import('../pages/create-strategy-teams/create-strategy-teams.module').then(m => m.CreateStrategyTeamsModule) },
          { path: 'mis-estrategias/:strategyId/asignar-roles', loadChildren: () => import('../pages/strategy-teams-roles/strategy-teams-roles.module').then(m => m.StrategyTeamsRolesModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos', loadChildren: () => import('../pages/strategy-teams-progress/strategy-teams-progress.module').then(m => m.StrategyTeamsProgressModule) },
          { path: 'mis-estrategias/:strategyId/progreso-equipos/:teamId/evaluar/:parcialProductId', loadChildren: () => import('../pages/grade-product/grade-product.module').then(m => m.GradeProductModule) },
          { path: 'mis-estrategias/:strategyId/progreso-estudiantes/:studentId/evaluar/:parcialProductId', loadChildren: () => import('../pages/grade-product/grade-product.module').then(m => m.GradeProductModule) },
          { path: 'tipo-plantillas/:templateTypeId', loadChildren: () => import('../pages/type-templates/type-templates.module').then(m => m.TypeTemplatesModule) },
          { path: 'plantillas', loadChildren: () => import('../pages/templates/templates.module').then(m => m.TemplatesModule) },
          { path: 'plantillas/:templateId', loadChildren: () => import('../pages/create-strategy/create-strategy.module').then(m => m.CreateStrategyModule) },
          { path: 'plantillas/:templateId/crear/:strategyId', loadChildren: () => import('../pages/strategy-creation-form/strategy-creation-form.module').then(m => m.StrategyCreationFormModule) },
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
          { path: 'home', loadChildren: () => import('../pages/student-dashboard/student-dashboard.module').then(m => m.StudentDashboardModule) },
          { path: 'mis-actividades', loadChildren: () => import('../pages/student-activities/student-activities.module').then(m => m.StudentActivitiesModule) },
          { path: 'mis-actividades/detalle-de-actividad/:activityId', loadChildren: () => import('../pages/student-activity-details/student-activity-details.module').then(m => m.StudentActivityDetailsModule) },
          { path: 'mis-estadisticas', loadChildren: () => import('../pages/student-stats/student-stats.module').then(m => m.StudentStatsModule) },
          { path: 'calendario', loadChildren: () => import('../pages/student-calendar/student-calendar.module').then(m => m.StudentCalendarModule) },
          { path: 'calendario/:date/actividades', loadChildren: () => import('../pages/student-calendar-date-events/student-calendar-date-events.module').then(m => m.StudentCalendarDateEventsModule) },
        ]
      },
    ]
  }
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
