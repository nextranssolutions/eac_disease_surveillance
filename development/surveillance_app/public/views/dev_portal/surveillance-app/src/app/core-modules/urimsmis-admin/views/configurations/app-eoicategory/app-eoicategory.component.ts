import { Component } from '@angular/core';

@Component({
  selector: 'app-app-eoicategory',
  templateUrl: './app-eoicategory.component.html',
  styleUrl: './app-eoicategory.component.css'
})
export class AppEoicategoryComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'eoi_category';
    this.parameter_name = "eoi_category";
  }

  ngOnInit() {
 
  }
}
