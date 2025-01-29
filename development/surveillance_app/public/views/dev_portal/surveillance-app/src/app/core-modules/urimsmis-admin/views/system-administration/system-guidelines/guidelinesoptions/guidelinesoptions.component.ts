import { Component } from '@angular/core';

@Component({
  selector: 'app-guidelinesoptions',
  templateUrl: './guidelinesoptions.component.html',
  styleUrl: './guidelinesoptions.component.css'
})
export class GuidelinesoptionsComponent {

  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'par_guidelinesoptions';
    this.parameter_name = "guidelinesoptions";
  }

  ngOnInit() {
    // other initializations
  }
}
