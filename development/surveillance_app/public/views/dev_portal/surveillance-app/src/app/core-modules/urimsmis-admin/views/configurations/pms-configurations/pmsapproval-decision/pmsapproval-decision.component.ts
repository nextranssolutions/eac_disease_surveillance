import { Component } from '@angular/core';

@Component({
  selector: 'app-pmsapproval-decision',
  templateUrl: './pmsapproval-decision.component.html',
  styleUrl: './pmsapproval-decision.component.css'
})
export class PmsapprovalDecisionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmsapproval_decisions';
    this.parameter_name = "pms_approval_decisions";
  }
}
