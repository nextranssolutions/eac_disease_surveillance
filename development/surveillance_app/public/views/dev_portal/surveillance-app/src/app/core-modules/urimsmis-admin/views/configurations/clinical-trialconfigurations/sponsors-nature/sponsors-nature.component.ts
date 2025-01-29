import { Component } from '@angular/core';

@Component({
  selector: 'app-sponsors-nature',
  templateUrl: './sponsors-nature.component.html',
  styleUrl: './sponsors-nature.component.css'
})
export class SponsorsNatureComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_sponsors_nature';
    this.parameter_name = "sponsors_nature";
  }
}
