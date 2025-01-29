import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicaloutcomes-types',
  templateUrl: './clinicaloutcomes-types.component.html',
  styleUrl: './clinicaloutcomes-types.component.css'
})
export class ClinicaloutcomesTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = "cfg_clinicaloutcome_types";
    this.parameter_name = "clinical_outcome_types";
  }

}
