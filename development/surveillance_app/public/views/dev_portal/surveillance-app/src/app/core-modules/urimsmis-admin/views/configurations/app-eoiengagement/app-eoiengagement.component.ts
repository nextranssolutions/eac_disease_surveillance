import { Component } from '@angular/core';

@Component({
  selector: 'app-app-eoiengagement',
  templateUrl: './app-eoiengagement.component.html',
  styleUrl: './app-eoiengagement.component.css'
})
export class AppEoiengagementComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_engagement_types';
    this.parameter_name = "engagement_type";
  }

  ngOnInit() {
  
  }
}