import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicaldisease-conditions',
  templateUrl: './clinicaldisease-conditions.component.html',
  styleUrl: './clinicaldisease-conditions.component.css'
})
export class ClinicaldiseaseConditionsComponent {
table_name: string;
parameter_name: string;
constructor(
  // private http: HttpClient,
) {
  this.table_name = 'cfg_clinical_diseaseconditions';
  this.parameter_name = "clinical_disease_conditions";
}
}
