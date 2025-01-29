import { Component } from '@angular/core';

@Component({
  selector: 'app-app-processworkflowstatuses',
 
  templateUrl: './app-processworkflowstatuses.component.html',
  styleUrl: './app-processworkflowstatuses.component.css'
})
export class AppProcessworkflowstatusesComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_statuses';
    this.parameter_name = "workflow_statuses";
    this.resetcolumns = 'table_name,stage_status_id,workflow_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
     
  }
  ngOnInit() {
    // other initializations

  }
}
