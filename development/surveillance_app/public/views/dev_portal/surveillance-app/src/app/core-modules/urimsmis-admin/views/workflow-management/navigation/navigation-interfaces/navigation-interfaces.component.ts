import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-interfaces',
 
  templateUrl: './navigation-interfaces.component.html',
  styleUrl: './navigation-interfaces.component.css'
})
export class NavigationInterfacesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_system_interfaces';
    this.parameter_name = "navigation_system_interfaces";
  }
  ngOnInit() {
    // other initializations

  }
}
