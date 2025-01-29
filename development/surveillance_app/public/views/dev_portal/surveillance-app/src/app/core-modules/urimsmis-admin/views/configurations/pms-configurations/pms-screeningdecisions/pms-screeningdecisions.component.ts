import { Component } from '@angular/core';

@Component({
  selector: 'app-pms-screeningdecisions',
  templateUrl: './pms-screeningdecisions.component.html',
  styleUrl: './pms-screeningdecisions.component.css'
})
export class PmsScreeningdecisionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmsscreening_decisions';
    this.parameter_name = "pms_screening_decisions";
  }
}
