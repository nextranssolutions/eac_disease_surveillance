import { Component } from '@angular/core';

@Component({
  selector: 'app-premise-type',
  templateUrl: './premise-type.component.html',
  styleUrl: './premise-type.component.css'
})
export class PremiseTypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_premises_types';
    this.parameter_name = "premise_type";
  }
}
