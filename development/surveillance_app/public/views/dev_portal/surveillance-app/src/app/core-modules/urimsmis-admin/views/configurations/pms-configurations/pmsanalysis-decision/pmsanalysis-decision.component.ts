import { Component } from '@angular/core';

@Component({
  selector: 'app-pmsanalysis-decision',
  templateUrl: './pmsanalysis-decision.component.html',
  styleUrl: './pmsanalysis-decision.component.css'
})
export class PmsanalysisDecisionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmsanalysis_decisions';
    this.parameter_name = "pms_analysis_decisions";
  }
}
