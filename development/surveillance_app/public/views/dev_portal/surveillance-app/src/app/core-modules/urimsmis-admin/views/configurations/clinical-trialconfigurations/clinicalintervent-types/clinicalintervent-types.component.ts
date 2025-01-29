import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalintervent-types',
  templateUrl: './clinicalintervent-types.component.html',
  styleUrl: './clinicalintervent-types.component.css'
})
export class ClinicalinterventTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_intervention_types';
    this.parameter_name = "clinical_intervention_types";
  }
}
