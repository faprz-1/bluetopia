import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'landing-page', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)},
  { path: 'inicio', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
