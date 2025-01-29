import { Component } from '@angular/core';

@Component({
  selector: 'app-clinical-trialpersonnel',
  templateUrl: './clinical-trialpersonnel.component.html',
  styleUrl: './clinical-trialpersonnel.component.css'
})
export class ClinicalTrialpersonnelComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'txn_clinical_trial_personnel';
    this.parameter_name = "clinical_trial_personnel";
  }
}
