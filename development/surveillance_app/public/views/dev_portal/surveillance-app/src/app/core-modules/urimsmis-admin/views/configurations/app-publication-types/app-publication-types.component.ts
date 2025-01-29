import { Component } from '@angular/core';

@Component({
  selector: 'app-app-publication-types',
  templateUrl: './app-publication-types.component.html',
  styleUrl: './app-publication-types.component.css'
})
export class AppPublicationTypesComponent {
  table_name:string;
  parameter_name:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'par_publication_types';
    this.parameter_name = "publication_types";
  }

  ngOnInit() {
    // other initializations

  }
}
