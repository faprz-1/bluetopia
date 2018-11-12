import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' },
        { path: 'perfil', loadChildren: '../components/profile/profile.module#ProfileModule' }
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);