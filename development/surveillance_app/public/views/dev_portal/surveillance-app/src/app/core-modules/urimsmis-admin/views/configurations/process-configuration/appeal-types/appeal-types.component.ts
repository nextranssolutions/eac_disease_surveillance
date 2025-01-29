import { Component } from '@angular/core';

@Component({
  selector: 'app-appeal-types',
  templateUrl: './appeal-types.component.html',
  styleUrl: './appeal-types.component.css'
})
export class AppealTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_appeal_types';
    this.parameter_name = "appeal_types";
  }
}
