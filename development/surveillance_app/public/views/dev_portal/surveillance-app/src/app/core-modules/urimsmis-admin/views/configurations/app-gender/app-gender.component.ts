import { Component } from '@angular/core';

@Component({
  selector: 'app-app-gender',
  templateUrl: './app-gender.component.html',
  styleUrl: './app-gender.component.css'
})
export class AppGenderComponent {
  table_name:string;
  parameter_name:string;
  constructor(
  ) {
    this.table_name = 'par_gender';
    this.parameter_name = "gender";
  }
}
