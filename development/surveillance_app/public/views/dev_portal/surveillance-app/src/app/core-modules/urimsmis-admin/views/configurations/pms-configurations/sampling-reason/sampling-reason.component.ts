import { Component } from '@angular/core';

@Component({
  selector: 'app-sampling-reason',
  templateUrl: './sampling-reason.component.html',
  styleUrl: './sampling-reason.component.css'
})
export class SamplingReasonComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_samplingreasons';
    this.parameter_name = "sampling reasonss";
  }
}
