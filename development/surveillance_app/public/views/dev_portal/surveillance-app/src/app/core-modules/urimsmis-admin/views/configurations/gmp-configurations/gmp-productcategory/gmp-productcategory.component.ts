import { Component } from '@angular/core';

@Component({
  selector: 'app-gmp-productcategory',
  templateUrl: './gmp-productcategory.component.html',
  styleUrl: './gmp-productcategory.component.css'
})
export class GmpProductcategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_gmp_product_categories';
    this.parameter_name = "product_categories";
  }
}
