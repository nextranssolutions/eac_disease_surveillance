import { Component } from '@angular/core';

@Component({
  selector: 'app-business-categories',
  templateUrl: './business-categories.component.html',
  styleUrl: './business-categories.component.css'
})
export class BusinessCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_business_categories';
    this.parameter_name = "business_categories";
  }
}
