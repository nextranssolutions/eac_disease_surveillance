import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-institutiondepartments',
  templateUrl: './app-institutiondepartments.component.html',
  styleUrls: ['./app-institutiondepartments.component.css']
})
export class AppInstitutionDepartments {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions_department';
    this.parameter_name = "institution_departments";
  }

  ngOnInit() {
    // other initializations

  }
}
