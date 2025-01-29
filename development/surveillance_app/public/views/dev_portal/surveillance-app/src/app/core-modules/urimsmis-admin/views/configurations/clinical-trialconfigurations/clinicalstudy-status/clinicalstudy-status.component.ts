import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalstudy-status',
  templateUrl: './clinicalstudy-status.component.html',
  styleUrl: './clinicalstudy-status.component.css'
})
export class ClinicalstudyStatusComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinicalstudy_statuses';
    this.parameter_name = "clinical_study_statuses";
  }
}
