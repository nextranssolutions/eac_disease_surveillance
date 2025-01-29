import { Component } from '@angular/core';

@Component({
  selector: 'app-app-applicationtypes',
  templateUrl: './app-applicationtypes.component.html',
  styleUrl: './app-applicationtypes.component.css'
})
export class AppApplicationtypesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_application_types';
    this.parameter_name = "product_application_types";
  }
  
  ngOnInit() {
    // other initializations

  }
}
