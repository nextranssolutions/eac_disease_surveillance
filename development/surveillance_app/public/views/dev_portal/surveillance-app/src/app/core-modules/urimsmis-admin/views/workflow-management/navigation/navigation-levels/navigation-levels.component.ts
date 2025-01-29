import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-levels',
 
  templateUrl: './navigation-levels.component.html',
  styleUrl: './navigation-levels.component.css'
})
export class NavigationLevelsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_navigation_levels';
    this.parameter_name = "Navigation Levels";
  }
  ngOnInit() {
    // other initializations

  }
}
