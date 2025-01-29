import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-app-currencies',
  templateUrl: './app-currencies.component.html',
  styleUrls: ['./app-currencies.component.css']
})
export class AppCurrenciesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_currencies';
    this.parameter_name = "currency_details";
  }

  ngOnInit() {
    // other initializations

  }
}
