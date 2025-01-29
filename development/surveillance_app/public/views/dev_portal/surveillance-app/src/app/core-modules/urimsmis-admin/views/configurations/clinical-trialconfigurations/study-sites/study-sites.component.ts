import { Component } from '@angular/core';

@Component({
  selector: 'app-study-sites',
  templateUrl: './study-sites.component.html',
  styleUrl: './study-sites.component.css'
})
export class StudySitesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_study_sites';
    this.parameter_name = "study_sites";
  }
}
