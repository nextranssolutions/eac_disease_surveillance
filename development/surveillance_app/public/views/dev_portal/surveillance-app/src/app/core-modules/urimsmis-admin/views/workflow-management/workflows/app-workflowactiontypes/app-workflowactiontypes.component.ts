import { Component } from '@angular/core';

@Component({
  selector: 'app-app-workflowactiontypes',

  templateUrl: './app-workflowactiontypes.component.html',
  styleUrl: './app-workflowactiontypes.component.css'
})
export class AppWorkflowactiontypesComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_actionstypes';
    this.parameter_name = "workflow_action_types";
    
    // this.resetcolumns = 'workflow_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id,stage_status_id,workflow_action_id,statuses_action_id';
    this.resetcolumns = 'table_name,stage_status_id';
  }
  ngOnInit() {
    // other initializations

  }
}
