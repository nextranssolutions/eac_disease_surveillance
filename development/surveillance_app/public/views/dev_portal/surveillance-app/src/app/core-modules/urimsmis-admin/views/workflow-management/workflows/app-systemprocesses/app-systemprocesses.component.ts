import { Component } from '@angular/core';

@Component({
  selector: 'app-app-systemprocesses',

  templateUrl: './app-systemprocesses.component.html',
  styleUrl: './app-systemprocesses.component.css'
})
export class AppSystemprocessesComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_processes';
    this.parameter_name = "system_processes";
    this.resetcolumns = 'stage_status_id,workflow_id,process_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
     
  }
  ngOnInit() {
    // other initializations

  }
}