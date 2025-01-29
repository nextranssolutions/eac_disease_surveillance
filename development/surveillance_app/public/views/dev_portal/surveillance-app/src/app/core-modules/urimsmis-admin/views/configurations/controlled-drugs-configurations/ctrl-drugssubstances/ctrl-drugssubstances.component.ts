import { Component } from '@angular/core';

@Component({
  selector: 'app-ctrl-drugssubstances',
  templateUrl: './ctrl-drugssubstances.component.html',
  styleUrl: './ctrl-drugssubstances.component.css'
})
export class CtrlDrugssubstancesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_controlled_drugssubstances';
    this.parameter_name = "controlled_drugs_substances";
  }
}
