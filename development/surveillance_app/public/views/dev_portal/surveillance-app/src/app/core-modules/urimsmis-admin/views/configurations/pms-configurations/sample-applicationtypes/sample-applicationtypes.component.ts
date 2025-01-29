import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-applicationtypes',
  templateUrl: './sample-applicationtypes.component.html',
  styleUrl: './sample-applicationtypes.component.css'
})
export class SampleApplicationtypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_sample_application_types';
    this.parameter_name = "sample_application_types";
  }
}
