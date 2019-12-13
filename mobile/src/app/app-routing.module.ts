import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' , canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' , canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'password-recovery', loadChildren: './pages/password-recovery/password-recovery.module#PasswordRecoveryPageModule' },
  {
    path: 'settings', children: [
      { path: '', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
      { path: 'password-change', loadChildren: './pages/settings/password-change/password-change.module#PasswordChangePageModule' },
      { path: 'add-card', loadChildren: './pages/settings/add-card/add-card.module#AddCardPageModule' }
    ]
  },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },  { path: 'buy-page', loadChildren: './pages/buy-page/buy-page.module#BuyPagePageModule' },
  { path: 'refounds', loadChildren: './pages/refounds/refounds.module#RefoundsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
