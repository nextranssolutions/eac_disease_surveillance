import { Component, Input, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-sharedusermanagement',
  templateUrl: './sharedusermanagement.component.html',
  styleUrl: './sharedusermanagement.component.css'
})
export class SharedusermanagementComponent {

  
  @Input() table_name: string;
  @Input() parameter_name: string;
  userinfoData: any[] = [];
  createNewDataFrm: FormGroup;
  isnewuser: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  show_advancesearch: boolean;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id:number;
  addPopupVisible = false;
  deletePopupVisible = false;
  data_record: any;
  config_record:string;
  Users: any;

  Countries: any[] = [];
  AccountType: any[] = [];
  UserTitle: any[] = [];
  IdentificationType: any[] = [];





  permitActiveUserAccountsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  regStatusOptions = [
    { value: true, text: 'Approve User' },
    { value: null, text: 'Disprove User' },
    { value: false, text: 'Block User' },
  ];

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthenticationService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
     public modalService: NgxSmartModalService,
    private userManagementService: UserManagementService,
    private reportingAnalytics: ReportsService
  ) {

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([Validators.required])),
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      user_group_id: new FormControl('', Validators.compose([Validators.required])),
      is_verified: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      password_confirmation: new FormControl('', Validators.compose([Validators.required])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
    });
    
  }
ngOnInit() {
  // other initializations
  this.fetchUserDetails();

  // this.fetchCountries();

  // this.fetchAccountType();

  // this.fetchUserTitle();

  // this.fetchIdentificationType();


}

fetchUserDetails() {

  var data_submit = {
    'table_name': this.table_name
  }
  this.userManagementService.onLoadUserData(data_submit)
    .subscribe(
      data => {
        this.data_record = data;
        
        if (this.data_record.success) {
          this.Users = this.data_record.data;
        }

      },
      error => {
        
      });

}

onAdvanceProductRegistrySearch(e){
  e.toolbarOptions.items.unshift({
    location: 'after',
    widget: 'dxCheckBox',
    options: {
      icon: 'select',
      text: 'Show Advanced Search',
      value: this.show_advancesearch,
      onValueChanged: this.onActivatetheAdvanceSearch.bind(this)
    }
  });
}

onActivatetheAdvanceSearch(e){

  this.show_advancesearch =  e.value;

}

onAddNewUser() {
  this.isnewuser = true;
  // this.createNewDataFrm.reset();
  this.addPopupVisible = true;

}

onAddProductCategoryClick() {
  this.createNewDataFrm.reset();
  this.addPopupVisible = true;
}
onSaveUserData() {

  const formData = new FormData();
  const invalid = [];
  const controls = this.createNewDataFrm.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
      return;
    }
  }
  if (this.createNewDataFrm.invalid) {
    return;
  }
  this.spinner.show();
  this.userManagementService.onsaveUserData(this.table_name, this.createNewDataFrm.value, 'onsaveUserData')
    .subscribe(
      response => {
        this.response = response;
        //the details 
        if (this.response.success) {
          this.fetchUserDetails();
          this.isnewuser = false;
          this.toastr.success(this.response.message, 'Response');

        } else {
          this.toastr.error(this.response.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
        this.spinner.hide();
      });
}

funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width / 100;
} 
funcpopHeight(percentage_height) {
  return window.innerHeight * percentage_height/100;
}
finishFunction() {

}

onPopupHidden() {
  this.fetchUserDetails();
}

funcEditDetails(data) {
  this.createNewDataFrm.patchValue(data.data);
  this.isnewuser = true;
}
funcDeleteDetails(data) {
  this.createNewDataFrm.patchValue(data.data);
  this.config_record = data.data.name;
  this.deletePopupVisible = true;
}

funcActionColClick(e, data) {
  var action_btn = e.itemData;
  if (action_btn.action === 'edit_record') {
    this.funcEditDetails(data);
  } else if (action_btn.action === 'delete_record') {
    this.funcDeleteDetails(data);
  } else if (action_btn.action === 'block_record') {
    this.funcDeleteDetails(data);
  }
}
onCellPrepared(e) {
  this.utilityService.onCellCountriesPrepared(e);
}
onDeleteUserData() {
        this.spinner.show();
        this.userManagementService.onDeleteUserData(this.createNewDataFrm.value, this.table_name, this.parameter_name)
          .subscribe(
            response => {
              this.spinner.hide();
              this.response  = response;
              if (this.response.success) {
                this.fetchUserDetails();
                this.toastr.success(this.response.message, 'Response');
              }
              else {

                this.toastr.success(this.response.message, 'Response');

              }

            },
            error => {
              this.loading = false;
            });
      
}
onExporting(e: DxDataGridTypes.ExportingEvent) {

  if (e.format == 'pdf') {
    this.reportingAnalytics.onExportingPDF(e)
  }
  else {
    this.reportingAnalytics.onExportingExcelData(e)
  }

}

}
