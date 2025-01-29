import { Component } from '@angular/core';

@Component({
  selector: 'app-personnelstudy-field',
  templateUrl: './personnelstudy-field.component.html',
  styleUrl: './personnelstudy-field.component.css'
})
export class PersonnelstudyFieldComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_personnel_studyfield';
    this.parameter_name = "personnel_studyfield";
  }
}
