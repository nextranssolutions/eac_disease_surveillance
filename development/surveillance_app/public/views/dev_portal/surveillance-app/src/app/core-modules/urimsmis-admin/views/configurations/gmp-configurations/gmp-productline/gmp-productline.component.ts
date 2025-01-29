import { Component } from '@angular/core';

@Component({
  selector: 'app-gmp-productline',
  templateUrl: './gmp-productline.component.html',
  styleUrl: './gmp-productline.component.css'
})
export class GmpProductlineComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_gmp_product_lines';
    this.parameter_name = "product_lines";
  }
}
