import { Component } from '@angular/core';

@Component({
  selector: 'app-business-type-details',
  templateUrl: './business-type-details.component.html',
  styleUrl: './business-type-details.component.css'
})
export class BusinessTypeDetailsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_business_type_details';
    this.parameter_name = "business_type_details";
  }
}
