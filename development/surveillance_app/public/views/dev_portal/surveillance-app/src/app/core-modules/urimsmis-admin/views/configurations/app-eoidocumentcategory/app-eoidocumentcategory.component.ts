import { Component } from '@angular/core';

@Component({
  selector: 'app-app-eoidocumentcategory',
  templateUrl: './app-eoidocumentcategory.component.html',
  styleUrl: './app-eoidocumentcategory.component.css'
})
export class AppEoidocumentcategoryComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'eoi_document_types';
    this.parameter_name = "document_types";
  }

  ngOnInit() {
  
  }
}
