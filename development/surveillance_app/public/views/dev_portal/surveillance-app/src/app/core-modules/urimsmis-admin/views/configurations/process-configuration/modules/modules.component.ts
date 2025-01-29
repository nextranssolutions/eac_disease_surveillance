import { Component } from '@angular/core';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.css'
})
export class ModulesComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_regulatory_functions';
    this.parameter_name = "regulatory_functions";
  }
  ngOnInit() {
    // other initializations

  }
}
