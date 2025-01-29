import { Component } from '@angular/core';

@Component({
  selector: 'app-permit-reasons',
  templateUrl: './permit-reasons.component.html',
  styleUrl: './permit-reasons.component.css'
})
export class PermitReasonsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_permit_reasons';
    this.parameter_name = "permit_reasons";
  }
}
