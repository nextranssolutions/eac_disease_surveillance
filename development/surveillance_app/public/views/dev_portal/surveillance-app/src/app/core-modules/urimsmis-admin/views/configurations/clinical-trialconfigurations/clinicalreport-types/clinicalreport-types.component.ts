import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalreport-types',
  templateUrl: './clinicalreport-types.component.html',
  styleUrl: './clinicalreport-types.component.css'
})
export class ClinicalreportTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinicalreport_type';
    this.parameter_name = "clinical_report_type";
  }
}
