import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-accounttypes',
  templateUrl: './user-accounttypes.component.html',
  styleUrl: './user-accounttypes.component.css'
})
export class UserAccounttypesComponent implements OnInit {
  table_name: string;
  parameter_name: string;
  resetcolumns: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink';

    this.table_name = 'sys_account_types';
    this.parameter_name = "user_account_type_details";
  }

  ngOnInit() {
    // other initializations
  }

}