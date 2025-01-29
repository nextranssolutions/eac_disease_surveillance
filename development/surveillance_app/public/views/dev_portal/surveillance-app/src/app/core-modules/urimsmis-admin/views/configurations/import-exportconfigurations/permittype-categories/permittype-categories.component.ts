import { Component } from '@angular/core';

@Component({
  selector: 'app-permittype-categories',
  templateUrl: './permittype-categories.component.html',
  styleUrl: './permittype-categories.component.css'
})
export class PermittypeCategoriesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_permit_typecategories';
    this.parameter_name = "permit_type_categories";
  }
}
