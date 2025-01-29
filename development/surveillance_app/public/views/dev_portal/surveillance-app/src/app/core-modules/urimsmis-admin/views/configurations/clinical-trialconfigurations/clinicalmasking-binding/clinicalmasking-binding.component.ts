import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalmasking-binding',
  templateUrl: './clinicalmasking-binding.component.html',
  styleUrl: './clinicalmasking-binding.component.css'
})
export class ClinicalmaskingBindingComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_maskingbinding';
    this.parameter_name = "clinical_masking_binding";
  }

}
