import { Component } from '@angular/core';

@Component({
  selector: 'app-ctrl-drugstype',
  templateUrl: './ctrl-drugstype.component.html',
  styleUrl: './ctrl-drugstype.component.css'
})
export class CtrlDrugstypeComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_controlleddrugs_types';
    this.parameter_name = "controlled_drugs_types";
  }
}
