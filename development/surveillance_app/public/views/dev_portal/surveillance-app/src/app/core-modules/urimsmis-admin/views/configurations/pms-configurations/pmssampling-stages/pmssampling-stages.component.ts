import { Component } from '@angular/core';

@Component({
  selector: 'app-pmssampling-stages',
  templateUrl: './pmssampling-stages.component.html',
  styleUrl: './pmssampling-stages.component.css'
})
export class PmssamplingStagesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_pmssamples_stages';
    this.parameter_name = "pms_samples_stages";
  }
}
