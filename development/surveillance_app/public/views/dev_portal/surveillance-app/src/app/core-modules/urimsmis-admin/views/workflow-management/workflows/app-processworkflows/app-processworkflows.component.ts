import { Component } from '@angular/core';

@Component({
  selector: 'app-app-processworkflows',
  
  templateUrl: './app-processworkflows.component.html',
  styleUrl: './app-processworkflows.component.css'
})
export class AppProcessworkflowsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_definition';
    this.parameter_name = "workflow_definations";
    this.resetcolumns = 'table_name,stage_status_id,workflow_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
      
  }
  ngOnInit() {
    // other initializations

  }
}
