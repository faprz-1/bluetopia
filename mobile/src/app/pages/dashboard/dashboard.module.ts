import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardPage } from './dashboard.page';

import { BuyPagePage } from "../../pages/buy-page/buy-page.page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot(),
    ComponentsModule
  ],
  declarations: [DashboardPage,BuyPagePage],
  entryComponents: [BuyPagePage]
})
export class DashboardPageModule {}
