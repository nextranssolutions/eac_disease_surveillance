import { Component } from '@angular/core';

@Component({
  selector: 'app-business-scales',
  templateUrl: './business-scales.component.html',
  styleUrl: './business-scales.component.css'
})
export class BusinessScalesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_business_scales';
    this.parameter_name = "business_scales";
  }
}
