import { Component } from '@angular/core';

@Component({
  selector: 'app-app-processworkflowtransitions',
 
  templateUrl: './app-processworkflowtransitions.component.html',
  styleUrl: './app-processworkflowtransitions.component.css'
})
export class AppProcessworkflowtransitionsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_workflow_transitions';
    this.parameter_name = "workflow_processes_transitions";
    this.resetcolumns = 'table_name,stage_status_id';
  }
  ngOnInit() {
    // other initializations

  }
}
