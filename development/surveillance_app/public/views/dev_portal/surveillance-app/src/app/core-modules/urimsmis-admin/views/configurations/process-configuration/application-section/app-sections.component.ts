import { Component } from '@angular/core';

@Component({
  selector: 'app-app-sections',
  templateUrl: './app-sections.component.html',
  styleUrl: './app-sections.component.css'
})
export class AppSectionsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_application_sections';
    this.parameter_name = "application_sections";
  }
  ngOnInit() {
    // other initializations

  }
}
