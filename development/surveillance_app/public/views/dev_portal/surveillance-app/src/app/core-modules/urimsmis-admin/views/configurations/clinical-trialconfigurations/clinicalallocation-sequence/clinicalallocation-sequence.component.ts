import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalallocation-sequence',
  templateUrl: './clinicalallocation-sequence.component.html',
  styleUrl: './clinicalallocation-sequence.component.css'
})
export class ClinicalallocationSequenceComponent {
table_name: string;
parameter_name: string;
constructor(
  // private http: HttpClient,
) {
  this.table_name = 'cfg_clinical_allocation_sequence';
  this.parameter_name = "clinical_allocation_sequence";
}
}
