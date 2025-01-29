import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-navigation-levels',

  templateUrl: './portal-navigation-levels.component.html',
  styleUrl: './portal-navigation-levels.component.css'
})
export class PortalNavigationLevelsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ptl_navigation_levels';
    this.parameter_name = "portal_navigation_levels";
  }
  ngOnInit() {
    // other initializations

  }
}
