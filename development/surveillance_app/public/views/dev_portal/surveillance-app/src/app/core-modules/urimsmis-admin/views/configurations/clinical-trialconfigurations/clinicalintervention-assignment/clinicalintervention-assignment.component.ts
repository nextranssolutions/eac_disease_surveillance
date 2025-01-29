import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalintervention-assignment',
  templateUrl: './clinicalintervention-assignment.component.html',
  styleUrl: './clinicalintervention-assignment.component.css'
})
export class ClinicalinterventionAssignmentComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_intervention_assignment';
    this.parameter_name = "clinical_intervention_assignment";
  }
}
