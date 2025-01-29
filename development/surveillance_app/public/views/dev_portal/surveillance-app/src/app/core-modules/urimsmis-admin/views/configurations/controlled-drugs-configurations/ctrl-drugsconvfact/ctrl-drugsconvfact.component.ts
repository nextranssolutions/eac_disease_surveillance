import { Component } from '@angular/core';

@Component({
  selector: 'app-ctrl-drugsconvfact',
  templateUrl: './ctrl-drugsconvfact.component.html',
  styleUrl: './ctrl-drugsconvfact.component.css'
})
export class CtrlDrugsconvfactComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_controlleddrugsconv_factorsconfig';
    this.parameter_name = "controlled_drugs_conversion_factors_configuration";
  }
}
