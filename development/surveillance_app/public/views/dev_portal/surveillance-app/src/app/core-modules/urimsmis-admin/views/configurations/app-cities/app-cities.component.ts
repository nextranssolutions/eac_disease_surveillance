import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-app-cities',
  templateUrl: './app-cities.component.html',
  styleUrls: ['./app-cities.component.css']
})
export class AppCitiesComponent {

  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_cities';
    this.parameter_name = "country's_cities_provinces";
  }

  ngOnInit() {
    // other initializations

  }
  
  }
  