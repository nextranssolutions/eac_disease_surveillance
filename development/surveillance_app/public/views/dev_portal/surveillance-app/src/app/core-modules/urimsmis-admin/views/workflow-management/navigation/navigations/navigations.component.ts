import { Component } from '@angular/core';

@Component({
  selector: 'app-navigations',

  templateUrl: './navigations.component.html',
  styleUrl: './navigations.component.css'
})
export class NavigationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_navigation_items';
    this.parameter_name = "Navigation Items";
  }
  ngOnInit() {
    // other initializations

  }
}
