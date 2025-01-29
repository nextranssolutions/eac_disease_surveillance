import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-types',
  
  templateUrl: './navigation-types.component.html',
  styleUrl: './navigation-types.component.css'
})
export class NavigationTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_navigation_types';
    this.parameter_name = "navigation_types";
  }
  ngOnInit() {
    // other initializations

  }
}