import { Component } from '@angular/core';

@Component({
  selector: 'app-sponsor-levels',
  templateUrl: './sponsor-levels.component.html',
  styleUrl: './sponsor-levels.component.css'
})
export class SponsorLevelsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_sponsors_levels';
    this.parameter_name = "sponsors_levels";
  }
}
