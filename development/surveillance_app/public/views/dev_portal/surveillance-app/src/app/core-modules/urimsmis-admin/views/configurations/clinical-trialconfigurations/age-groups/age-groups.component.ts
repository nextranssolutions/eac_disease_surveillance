import { Component } from '@angular/core';

@Component({
  selector: 'app-age-groups',
  templateUrl: './age-groups.component.html',
  styleUrl: './age-groups.component.css'
})
export class AgeGroupsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_age_groups';
    this.parameter_name = "age_groups";
  }
}
