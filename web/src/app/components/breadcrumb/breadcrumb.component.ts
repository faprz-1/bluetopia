import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() crumbs: Array<{name: string, route: string | null}> = [];
  @Input() theme: 'success' | 'dark-blue' = 'success';

  @Output() onGoBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public navService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  GoBack() {
    const route = this.crumbs[this.crumbs.length - 1]?.route;
    if(!!route) this.navService.GoToUserRoute(route);
    else this.onGoBack.emit();
  }

  GoTo(route: string | null = null) {
    if(!!route) this.navService.GoToUserRoute(route);
  }

}
