import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-navigation-types',
  
  templateUrl: './portal-navigation-types.component.html',
  styleUrl: './portal-navigation-types.component.css'
})
export class PortalNavigationTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ptl_navigation_types';
    this.parameter_name = "portal_navigation_types";
  }
  ngOnInit() {
    // other initializations

  }
}