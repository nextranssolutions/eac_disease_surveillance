import { Component } from '@angular/core';

@Component({
  selector: 'app-pmstcmeeting-decision',
  templateUrl: './pmstcmeeting-decision.component.html',
  styleUrl: './pmstcmeeting-decision.component.css'
})
export class PmstcmeetingDecisionComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmstcmeeting_decisions';
    this.parameter_name = "pms_tc_meeting_decisions";
  }
}
