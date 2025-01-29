import { Component } from '@angular/core';

@Component({
  selector: 'app-app-exchangerates',
  templateUrl: './app-exchangerates.component.html',
  styleUrl: './app-exchangerates.component.css'
})
export class AppExchangeratesComponent {
    //tra_exchange_rates
    table_name:string;
    parameter_name:string;
    constructor(
      // private http: HttpClient,
    ) {
      this.table_name = 'tra_exchange_rates';
      this.parameter_name = "Currencies Exchange Rates Details";
    }
  
}
