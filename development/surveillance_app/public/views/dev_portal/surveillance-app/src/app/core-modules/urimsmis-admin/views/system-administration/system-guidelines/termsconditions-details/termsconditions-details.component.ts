import { Component } from '@angular/core';

@Component({
  selector: 'app-termsconditions-details',
  templateUrl: './termsconditions-details.component.html',
  styleUrl: './termsconditions-details.component.css'
})
export class TermsconditionsDetailsComponent {

  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'sys_termsconditions_details';
    this.parameter_name = "termsconditions_details";
  }

  ngOnInit() {
   
  }
}
