import { Component } from '@angular/core';

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrl: './interfaces.component.css'
})
export class InterfacesComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_interfaces';
    this.parameter_name = "workflow_interfaces";
    // this.resetcolumns = 'stage_status_id,workflow_id,process_id,prevworkflow_stage_id,nextworkflow_stage_id,workflow_status_id';
     
  }
  ngOnInit() {
    // other initializations

  }
}
