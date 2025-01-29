import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-institution',
  templateUrl: './app-institution.component.html',
  styleUrls: ['./app-institution.component.css']
})
export class AppInstitution {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_institutions';
    this.parameter_name = "Institutions Details";
  }

  ngOnInit() {
    // other initializations

  }
}
