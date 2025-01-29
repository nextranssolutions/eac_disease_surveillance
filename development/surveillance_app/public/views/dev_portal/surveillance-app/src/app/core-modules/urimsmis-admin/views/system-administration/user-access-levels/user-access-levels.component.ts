import { Component, OnInit, ViewChild } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-access-levels',
  templateUrl: './user-access-levels.component.html',
  styleUrls: ['./user-access-levels.component.css']
})
export class UserAccessLevelsComponent implements OnInit {
  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'usr_users_accesslvls';
    this.parameter_name = "user_access_levels_details";
  }

  ngOnInit() {
    // other initializations
  }

}