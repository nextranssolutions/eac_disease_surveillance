import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalstudy-phase',
  templateUrl: './clinicalstudy-phase.component.html',
  styleUrl: './clinicalstudy-phase.component.css'
})
export class ClinicalstudyPhaseComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    // this.table_name = ' cfg_clinical_sequence_generation';
    // this.parameter_name = "clinical_sequence_generation";
  }
}
