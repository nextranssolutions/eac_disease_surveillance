import { Component } from '@angular/core';

@Component({
  selector: 'app-premiseinspect-recommendation',
  templateUrl: './premiseinspect-recommendation.component.html',
  styleUrl: './premiseinspect-recommendation.component.css'
})
export class PremiseinspectRecommendationComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_premiseinspection_recommendations';
    this.parameter_name = "premise_inspection_recommendations";
  }
}
