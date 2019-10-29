import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'password-recovery', loadChildren: './pages/password-recovery/password-recovery.module#PasswordRecoveryPageModule' },
  {
    path: 'settings', children: [
      { path: '', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
      { path: 'password-change', loadChildren: './pages/settings/password-change/password-change.module#PasswordChangePageModule' },
    ]
  },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
