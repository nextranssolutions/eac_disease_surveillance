import { Component } from '@angular/core';

@Component({
  selector: 'app-clinicalnature-controls',
  templateUrl: './clinicalnature-controls.component.html',
  styleUrl: './clinicalnature-controls.component.css'
})
export class ClinicalnatureControlsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_clinical_natureofcontrols';
    this.parameter_name = "clinical_nature_of_controls";
  }

}
