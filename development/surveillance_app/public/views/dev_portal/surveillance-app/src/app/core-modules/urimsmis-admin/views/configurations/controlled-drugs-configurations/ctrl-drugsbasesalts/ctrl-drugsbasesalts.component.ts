import { Component } from '@angular/core';

@Component({
  selector: 'app-ctrl-drugsbasesalts',
  templateUrl: './ctrl-drugsbasesalts.component.html',
  styleUrl: './ctrl-drugsbasesalts.component.css'
})
export class CtrlDrugsbasesaltsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_controlleddrugs_basesalts';
    this.parameter_name = "controlled_drugs_base_salts";
  }
}
