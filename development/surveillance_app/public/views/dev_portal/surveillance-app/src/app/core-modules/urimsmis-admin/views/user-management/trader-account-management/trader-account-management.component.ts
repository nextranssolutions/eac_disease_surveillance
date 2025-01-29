import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { LanguagesService } from 'src/app/core-services/languages/languages.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';

@Component({
  selector: 'app-trader-account-management',
  templateUrl: './trader-account-management.component.html',
  styleUrl: './trader-account-management.component.css'
})
export class TraderAccountManagementComponent {

  userAccountFrm: FormGroup;
  loadingVisible: boolean;
  spinnerMessage: string;
  is_changepasswordwin: boolean;
  is_profileupdatewin: boolean;
  Countries: any;
  traderAccountData: any;
  is_viewprofilewin: boolean;
  is_readonly: boolean = true;
  isContentScrolled = false;
  response: any;
  data_record: any;
  userAccountTypeData: any;
  is_closablewin: boolean = true;
  userFirstName: string = '';
  userOtherNames: string = '';
  userGroupName: string = '';

  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };
  tabsPositions: DxTabPanelTypes.Position[] = [
    'left', 'top', 'right', 'bottom',
  ];
  tabsPosition: DxTabPanelTypes.Position = this.tabsPositions[0];
  stylingModes: DxTabPanelTypes.TabsStyle[] = ['primary', 'secondary'];
  stylingMode: DxTabPanelTypes.TabsStyle = this.stylingModes[0];
  screenWidth: any;
  user_data: any;
  user_details: any;
  customer_name: string;
  logged_in_name: string;
  last_login_time: string;
  trader_no: string;
  loggedin_time: string;
  show_advancesearch: boolean;
  addPopupVisible: boolean;
  config_record: any;
  deletePopupVisible: boolean;
  seeprofile: boolean;
  accountStatusData: any;
  districtData: any;
  regionData: any;
  traderCategoryData: any;
  countryData: any;

  table_name: string;

  permitActiveExpertAccountsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit/Preview Account", action: 'edit_record', icon: 'fa fa-edit' },
        // { text: "Assign & Approve User Group", action: 'assign_group', icon: 'fa fa-edit' },
        // { text: "Approve User Account", action: 'approve_useraccount', icon: 'fa fa-file' },
        { text: "Disable/Reject Account", action: 'disable_useraccount', icon: 'fa fa-trash' },
        { text: "View Profile", action: 'view_profile', icon: 'fa fa-eye' },
        // { text: "Appoint Expert", action: 'appoint_expert', icon: 'fa fa-check' },
        // { text: "View User Operations", action: 'user_operations', icon: 'fa fa-file' },
      ]
    }
  ];
  constructor(
    public translate: TranslateService,
    public toastr: ToastrService,
    public AuthService: AuthenticationService,
    private translationService: LanguagesService,
    public userservice: UserManagementService,
    public configService: ConfigurationsService,
    private router: Router,
    private reportingAnalytics: ReportsService,
    private spinner: SpinnerVisibilityService,
  ) {
    this.table_name = 'txn_trader_account';

    this.userAccountFrm = new FormGroup({
      id: new FormControl( Validators.compose([])),
      last_login_time: new FormControl('', Validators.compose([])),
      account_type_id: new FormControl('', Validators.compose([])),
      country_id: new FormControl('', Validators.compose([])),
      telephone_number: new FormControl('', Validators.compose([])),
      contact_person: new FormControl('', Validators.compose([])),
      contact_person_email: new FormControl('', Validators.compose([])),
      contact_person_telephone: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      website: new FormControl('', Validators.compose([])),
      status_id: new FormControl('', Validators.compose([])),
      fax: new FormControl('', Validators.compose([])),
      // created_on: new FormControl('', Validators.compose([Validators.required])),
      
      postal_address: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      phone_number: new FormControl('', Validators.compose([])),
      trader_category_id: new FormControl('', Validators.compose([])),
      traderaccount_type_id: new FormControl('', Validators.compose([])),
      tpin_no: new FormControl('', Validators.compose([])),
      pacra_reg_no: new FormControl('', Validators.compose([])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      code_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      identification_no: new FormControl('', Validators.compose([])),
    });
    
  }

  ngOnInit(): void {

    if (localStorage.getItem('user')) {
      this.user_data = localStorage.getItem('user');

      this.user_details = JSON.parse(this.user_data);
      // ;

      this.customer_name = this.user_details.customer_name;
      this.logged_in_name = this.user_details.logged_in_name;
      this.last_login_time = this.user_details.last_login_time;
      this.trader_no = this.user_details.identification_no;
    }
    this.onLoadAccountTypesData();
    this.onGetSingleUserProfileDetails()
    this.fetchCountryData()
    this.fetchTraderDetails()
    this.fetchAccountStatusData()
    this.fetchDistrictData()
    this.fetchRegionData()
    this.fetchTraderCategoryData()
  }
  onPopupHidden() {
    this.fetchTraderDetails(0);
  }

  onGetSingleUserProfileDetails() {

    var data_submit = {
      'table_name': 'txn_trader_account'
    }
    this.spinnerShow('Loading user Profile Details');

    this.userservice.onGetSingleUserProfileDetails(data_submit)
      .subscribe(
        data => {

          this.data_record = data;

          if (this.data_record.success) {
            this.userAccountFrm.patchValue(this.data_record.data)
          }
          this.spinnerHide()
        },
        error => {

          this.spinnerHide()
        });
  }

  // onsaveTraderAccountsDetails() {
  //   const formData = new FormData();
  //   const invalid = [];
  //   const controls = this.userAccountFrm.controls;
  //   for (const name in controls) {
  //     if (controls[name].invalid) {
  //       this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
  //       return;
  //     }
  //   }
  //   if (this.userAccountFrm.invalid) {
  //     return;
  //   }
  //   this.spinnerShow('Updating User details');

  //   this.userservice.onsaveUserData(this.table_name, this.userAccountFrm.value, 'onsaveTraderData')
  //     .subscribe(
  //       response => {
  //         this.response = response;
  //         //the details 
  //         if (this.response.success) {
  //           this.toastr.success(this.response.message, 'Response');

  //         } else {
  //           this.toastr.error(this.response.message, 'Alert');
  //         }
  //         this.spinnerHide()
  //       },
  //       error => {
  //         this.toastr.error('Error Occurred', 'Alert');
  //         this.spinnerHide()
  //       });
  // }

  onsaveTraderAccountsDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.userAccountFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.userAccountFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.userservice.onsaveUserData(this.table_name,this.userAccountFrm.value, 'onsaveTraderData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchTraderDetails();
            this.addPopupVisible = false;
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

  onLoadAccountTypesData() {
    var data_submit = {
      'table_name': 'ptl_account_types'
    }
    this.userservice.onLoadPortalUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.userAccountTypeData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchCountryData() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.countryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchTraderCategoryData() {
    var data_submit = {
      'table_name': 'cfg_trader_categories'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.traderCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchRegionData() {
    var data_submit = {
      'table_name': 'cfg_regions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.regionData = this.data_record.data;
          }
        },
        error => {

        });
  }
  
  fetchDistrictData() {
    var data_submit = {
      'table_name': 'cfg_districts'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.districtData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchAccountStatusData() {
    var data_submit = {
      'table_name': 'cfg_districts'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.accountStatusData = this.data_record.data;
          }
        },
        error => {

        });
  }


  fetchTraderDetails(appworkflow_status_id = 0, is_eacsecretariat = false) {
    this.spinnerShow('Loading Traders ...........');

    var data_submit = {
      'table_name': 'txn_trader_account',
      // 'appworkflow_status_id': appworkflow_status_id,

    }
    this.userservice.onGetUserInformation(data_submit, 'onGetTraderInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.traderAccountData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

        });

  }

  permitActiveUserAccountsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.is_readonly = false;

      this.funcEditDetails(data);
    } else if (action_btn.action === 'view_profile') {
      this.is_readonly = true;
      this.funcprofileDetails(data);
    }
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }

  }


  funcEditDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.addPopupVisible = true;
  }
  funcDeleteDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcprofileDetails(data) {
    this.userAccountFrm.patchValue(data.data);
    this.seeprofile = true;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  onAddActiveUserAccountsClick() {
    this.is_readonly = false;
    this.addPopupVisible = true;
    this.userAccountFrm.reset();
  }


  spinnerHide() {
    this.loadingVisible = false;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  onCellPrepared(e) {
    this.onCellUserAccountPrepared(e);
  }
  onCellUserAccountPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "user_group_id") {
      let user_group_id = e.data.user_group_id;

      if (user_group_id < 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';

      }
    }
    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id == 1) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#0000FF';

      } else if (appworkflow_status_id == 3) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF0000';

      } else if (appworkflow_status_id == 2) {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#008000';

      } else {

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#808080';

      }
    }
  }

  onAdvanceSearch(e) {
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

  onActivatetheAdvanceSearch(e) {
    this.show_advancesearch = e.value;
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
