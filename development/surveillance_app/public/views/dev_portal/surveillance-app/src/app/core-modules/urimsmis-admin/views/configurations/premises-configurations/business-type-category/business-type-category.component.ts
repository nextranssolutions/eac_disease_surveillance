import { Component } from '@angular/core';

@Component({
  selector: 'app-business-type-category',
  templateUrl: './business-type-category.component.html',
  styleUrl: './business-type-category.component.css'
})
export class BusinessTypeCategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_businesstype_categories';
    this.parameter_name = "business_type_category";
  }
}
