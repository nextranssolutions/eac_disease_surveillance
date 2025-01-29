import { Component } from '@angular/core';

@Component({
  selector: 'app-personnel-position',
  templateUrl: './personnel-position.component.html',
  styleUrl: './personnel-position.component.css'
})
export class PersonnelPositionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_personnel_positions';
    this.parameter_name = "personnel_positions";
  }
}
