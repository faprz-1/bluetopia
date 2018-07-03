import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        //Medic
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' },
        { path: 'bug-report', loadChildren: '../components/bugs-report/bugs-report.module#BugsReportModule' },
        

    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);