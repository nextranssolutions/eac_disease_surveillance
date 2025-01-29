import { Component, OnInit, ViewChild } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-system-dashbordtypes',
  templateUrl: './system-dashbordtypes.component.html',
  styleUrl: './system-dashbordtypes.component.css'
})
export class SystemDashbordtypesComponent implements OnInit {
  table_name: string;
  parameter_name: string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,routerLink,has_partnerstate_defination';
    this.table_name = 'sys_dashboard_types';
    this.parameter_name = "system_dashboard_types";
  }

  ngOnInit() {
    // other initializations
  }

}