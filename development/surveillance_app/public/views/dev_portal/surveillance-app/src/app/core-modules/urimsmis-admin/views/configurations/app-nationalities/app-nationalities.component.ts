import { Component } from '@angular/core';

@Component({
  selector: 'app-app-nationalities',
  templateUrl: './app-nationalities.component.html',
  styleUrl: './app-nationalities.component.css'
})
export class AppNationalitiesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_nationalities';
    this.parameter_name = "nationalities";
  }
}
