import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() crumbs: Array<{name: string, route: string | null}> = [];

  constructor(
    public navService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  GoTo(routeToMoveTo:any=''){
    let route = routeToMoveTo ? routeToMoveTo: 'mis-estrategias';
    this.navService.GoToUserRoute(route);
  }

}
