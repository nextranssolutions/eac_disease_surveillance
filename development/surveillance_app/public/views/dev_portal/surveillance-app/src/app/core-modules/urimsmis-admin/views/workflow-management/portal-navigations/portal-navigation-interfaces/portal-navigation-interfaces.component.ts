import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-navigation-interfaces',
 
  templateUrl: './portal-navigation-interfaces.component.html',
  styleUrl: './portal-navigation-interfaces.component.css'
})
export class PortalNavigationInterfacesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'ptl_system_interfaces';
    this.parameter_name = "portal_navigation_system_interfaces";
  }
  ngOnInit() {
    // other initializations

  }
}
