import { Component, OnInit, ViewChild } from '@angular/core';
import { AppmenuService } from 'src/app/core-services/appmenu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-institutions-details',
  templateUrl: './institutions-details.component.html',
  styleUrl: './institutions-details.component.css'
})
export class InstitutionsDetailsComponent  implements OnInit {
  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  constructor(
    // private http: HttpClient,
  ) {
    this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    
    this.table_name = 'par_institutions';
    this.parameter_name = "Institutions Details";
  }

  ngOnInit() {
    // other initializations
  }

}