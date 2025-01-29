import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-navigations',

  templateUrl: './portal-navigations.component.html',
  styleUrl: './portal-navigations.component.css'
})
export class PortalNavigationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ptl_navigation_items';
    this.parameter_name = "portal_navigation_items";
  }
  ngOnInit() {
    // other initializations

  }
}
