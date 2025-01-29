import { Component } from '@angular/core';

@Component({
  selector: 'app-business-types',
  templateUrl: './business-types.component.html',
  styleUrl: './business-types.component.css'
})
export class BusinessTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_business_types';
    this.parameter_name = "business_types";
  }
}
