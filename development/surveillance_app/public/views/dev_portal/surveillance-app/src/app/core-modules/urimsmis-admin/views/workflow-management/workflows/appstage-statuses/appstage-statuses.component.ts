import { Component } from '@angular/core';

@Component({
  selector: 'app-appstage-statuses',
  
  templateUrl: './appstage-statuses.component.html',
  styleUrl: './appstage-statuses.component.css'
})
export class AppstageStatusesComponent  {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_stage_statuses';
    this.parameter_name = "stage_statuses";
    this.resetcolumns = 'table_name,stage_status_id,workflow_id,process_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
     
  }
  ngOnInit() {
    // other initializations

  }
}