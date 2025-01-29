import { Component } from '@angular/core';

@Component({
  selector: 'app-app-workflowstatusesinterfaces',
  templateUrl: './app-workflowstatusesinterfaces.component.html',
  styleUrl: './app-workflowstatusesinterfaces.component.css'
})
export class AppWorkflowstatusesinterfacesComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns: string;

  constructor(

  )
  {
    this.table_name ='wf_workflowstatuses_interfaces';
    this.parameter_name = 'workflowstatuses_interfaces';
    this.resetcolumns = ''
  }
  ngOnInit(){

  }
}
