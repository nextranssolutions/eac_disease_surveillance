import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalmasking-used',
  templateUrl: './clinicalmasking-used.component.html',
  styleUrl: './clinicalmasking-used.component.css'
})
export class ClinicalmaskingUsedComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = ' cfg_clinical_masking_used';
    this.parameter_name = "clinical_masking_used";
  }

}
