import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-institutions-departments',
  templateUrl: './institutions-departments.component.html',
  styleUrl: './institutions-departments.component.css'
})
export class InstitutionsDepartmentsComponent  implements OnInit {
  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'par_institutions_department';
    this.parameter_name = "institution_departments";
  }

  ngOnInit() {
    // other initializations
  }

}