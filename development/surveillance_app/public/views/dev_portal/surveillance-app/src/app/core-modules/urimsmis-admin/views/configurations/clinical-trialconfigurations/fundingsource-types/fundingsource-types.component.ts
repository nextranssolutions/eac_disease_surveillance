import { Component } from '@angular/core';

@Component({
  selector: 'app-fundingsource-types',
  templateUrl: './fundingsource-types.component.html',
  styleUrl: './fundingsource-types.component.css'
})
export class FundingsourceTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_fundingsource_types';
    this.parameter_name = "funding_source_types";
  }
}
