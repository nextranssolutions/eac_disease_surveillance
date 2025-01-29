import { Component } from '@angular/core';

@Component({
  selector: 'app-app-statusesactions',
  templateUrl: './app-statusesactions.component.html',
  styleUrl: './app-statusesactions.component.css'
})
export class AppStatusesactionsComponent {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'wf_statuses_actions';
    this.parameter_name = "statuses_actions";
    
    this.resetcolumns = 'table_name,stage_status_id';
  }
  ngOnInit() {
    // other initializations

  }
}
