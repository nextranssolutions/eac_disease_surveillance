import { Component } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.css'
})
export class SectionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_regulated_productstypes';
    this.parameter_name = "regulated_products_types";
  }
  ngOnInit() {
    // other initializations

  }
}
