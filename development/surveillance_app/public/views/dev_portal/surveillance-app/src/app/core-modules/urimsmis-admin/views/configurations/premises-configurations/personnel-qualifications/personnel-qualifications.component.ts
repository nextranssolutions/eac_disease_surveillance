import { Component } from '@angular/core';

@Component({
  selector: 'app-personnel-qualifications',
  templateUrl: './personnel-qualifications.component.html',
  styleUrl: './personnel-qualifications.component.css'
})
export class PersonnelQualificationsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_personnel_qualifications';
    this.parameter_name = "personnel_qualifications";
  }
}
