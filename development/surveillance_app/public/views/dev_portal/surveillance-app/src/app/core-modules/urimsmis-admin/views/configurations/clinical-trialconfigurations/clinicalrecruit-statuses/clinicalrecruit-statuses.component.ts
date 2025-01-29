import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalrecruit-statuses',
  templateUrl: './clinicalrecruit-statuses.component.html',
  styleUrl: './clinicalrecruit-statuses.component.css'
})
export class ClinicalrecruitStatusesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_recruitmentstatuses';
    this.parameter_name = "clinical_recruitment_statuses";
  }
}
