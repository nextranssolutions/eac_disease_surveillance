import { Component, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-app-countries',
  templateUrl: './app-countries.component.html',
  styleUrls: ['./app-countries.component.css']
})
export class AppCountriesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_countries';
    this.parameter_name = "country_details";
  }

  ngOnInit() {
    // other initializations

  }

}
