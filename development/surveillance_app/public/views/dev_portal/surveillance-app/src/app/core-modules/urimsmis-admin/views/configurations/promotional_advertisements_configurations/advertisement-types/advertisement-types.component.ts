import { Component } from '@angular/core';

@Component({
  selector: 'app-advertisement-types',
  templateUrl: './advertisement-types.component.html',
  styleUrl: './advertisement-types.component.css'
})
export class AdvertisementTypesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_advertisement_types';
    this.parameter_name = "advertisement_types";
  }
}
