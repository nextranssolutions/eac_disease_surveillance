import { Component } from '@angular/core';

@Component({
  selector: 'app-app-workflowstatusesactions',
  templateUrl: './app-workflowstatusesactions.component.html',
  styleUrl: './app-workflowstatusesactions.component.css'
})
export class AppWorkflowstatusesactionsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflowstatuses_actions';
    this.parameter_name = "workflowstatuses_actions";
    
    this.resetcolumns = 'table_name,stage_status_id';
  }
  ngOnInit() {
    // other initializations

  }
}
