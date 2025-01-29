import { Component } from '@angular/core';

@Component({
  selector: 'app-pmsevaluation-decisions',
  templateUrl: './pmsevaluation-decisions.component.html',
  styleUrl: './pmsevaluation-decisions.component.css'
})
export class PmsevaluationDecisionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmsevaluation_decisions';
    this.parameter_name = "pms_evaluation_decisions";
  }
}
