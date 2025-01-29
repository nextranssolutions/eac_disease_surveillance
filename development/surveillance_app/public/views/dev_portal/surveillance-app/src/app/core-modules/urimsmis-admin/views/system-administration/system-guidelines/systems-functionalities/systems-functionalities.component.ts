import { Component } from '@angular/core';

@Component({
  selector: 'app-systems-functionalities',
  templateUrl: './systems-functionalities.component.html',
  styleUrl: './systems-functionalities.component.css'
})
export class SystemsFunctionalitiesComponent {

  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'par_systems_functionalities';
    this.parameter_name = "systems_functionalities";
  }

  ngOnInit() {
  }
}
