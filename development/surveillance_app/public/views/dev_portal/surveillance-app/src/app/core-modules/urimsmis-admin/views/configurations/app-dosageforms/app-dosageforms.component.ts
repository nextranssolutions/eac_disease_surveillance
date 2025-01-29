import { Component } from '@angular/core';

@Component({
  selector: 'app-app-dosageforms',
  templateUrl: './app-dosageforms.component.html',
  styleUrl: './app-dosageforms.component.css'
})
export class AppDosageformsComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_dosage_forms';
    this.parameter_name = "dosage_forms_details";
  }
  
  ngOnInit() {
    // other initializations

  }
}
