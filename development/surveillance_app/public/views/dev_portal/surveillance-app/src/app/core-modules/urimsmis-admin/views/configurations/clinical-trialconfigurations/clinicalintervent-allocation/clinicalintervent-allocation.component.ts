import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalintervent-allocation',
  templateUrl: './clinicalintervent-allocation.component.html',
  styleUrl: './clinicalintervent-allocation.component.css'
})
export class ClinicalinterventAllocationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_intervention_allocation';
    this.parameter_name = "clinical_intervention_allocation";
  }
}
