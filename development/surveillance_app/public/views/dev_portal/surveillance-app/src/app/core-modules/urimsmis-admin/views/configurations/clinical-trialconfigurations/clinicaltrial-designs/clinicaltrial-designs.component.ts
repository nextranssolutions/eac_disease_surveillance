import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicaltrial-designs',
  templateUrl: './clinicaltrial-designs.component.html',
  styleUrl: './clinicaltrial-designs.component.css'
})
export class ClinicaltrialDesignsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinicaltrial_designs';
    this.parameter_name = "clinical_trial_designs";
  }
}
