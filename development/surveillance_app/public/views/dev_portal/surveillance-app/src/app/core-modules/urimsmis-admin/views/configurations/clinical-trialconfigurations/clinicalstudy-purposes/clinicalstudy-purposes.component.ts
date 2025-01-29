import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalstudy-purposes',
  templateUrl: './clinicalstudy-purposes.component.html',
  styleUrl: './clinicalstudy-purposes.component.css'
})
export class ClinicalstudyPurposesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_studypurposes';
    this.parameter_name = "clinical_study_purposes";
  }
}
