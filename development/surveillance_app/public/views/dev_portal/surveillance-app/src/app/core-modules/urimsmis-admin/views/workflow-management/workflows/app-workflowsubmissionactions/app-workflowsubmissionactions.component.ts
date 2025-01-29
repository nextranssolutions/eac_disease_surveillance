import { Component } from '@angular/core';

@Component({
  selector: 'app-app-workflowsubmissionactions',
  templateUrl: './app-workflowsubmissionactions.component.html',
  styleUrl: './app-workflowsubmissionactions.component.css'
})
export class AppWorkflowsubmissionactionsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflowsubmission_actions';
    this.parameter_name = "workflowsubmissions_actions";
    
    this.resetcolumns = 'table_name,stage_status_id';
  }
  ngOnInit() {
    // other initializations

  }
}
