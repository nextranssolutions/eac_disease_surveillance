import { Component } from '@angular/core';

@Component({
  selector: 'app-annual-ceilconf',
  templateUrl: './annual-ceilconf.component.html',
  styleUrl: './annual-ceilconf.component.css'
})
export class AnnualCeilconfComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_controlleddrugsannual_ceilingconfig';
    this.parameter_name = "annual_ceiling_configuration";
  }
}
