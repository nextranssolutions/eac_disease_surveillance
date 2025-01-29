import { Component } from '@angular/core';

@Component({
  selector: 'app-app-processworkflowsstages',
 
  templateUrl: './app-processworkflowsstages.component.html',
  styleUrl: './app-processworkflowsstages.component.css'
})
export class AppProcessworkflowsstagesComponent {
//
table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wkf_workflow_stages';
    this.parameter_name = "workflow_stages";
    this.resetcolumns = 'table_name,process_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
     
  }
  ngOnInit() {
    // other initializations

  }
}

