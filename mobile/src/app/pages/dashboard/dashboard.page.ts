import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/base/component-base';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends ComponentBase {

  public openNotifications() {
    this.navController.navigateRoot('/notification');
  }

  public goTo() {
    this.navController.navigateRoot('/buy-page');
  }
}
