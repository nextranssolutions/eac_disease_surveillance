import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalsequence-generation',
  templateUrl: './clinicalsequence-generation.component.html',
  styleUrl: './clinicalsequence-generation.component.css'
})
export class ClinicalsequenceGenerationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_sequence_generation';
    this.parameter_name = "clinical_sequence_generation";
  }
}
