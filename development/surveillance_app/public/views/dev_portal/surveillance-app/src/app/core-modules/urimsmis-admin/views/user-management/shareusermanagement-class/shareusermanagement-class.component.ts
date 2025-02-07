import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSettings } from 'src/app/app-settings';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
@Component({
  selector: 'app-shareusermanagement-class',
  templateUrl: './shareusermanagement-class.component.html',
  styleUrl: './shareusermanagement-class.component.css'
})
export class ShareusermanagementClassComponent {
  userAccountFrm: FormGroup;
  assignUserGroupFrm: FormGroup;
  userGroupData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  seeprofile: boolean;
  approvalPopupVisible: boolean;
  active_accounts: number = 0;
  rejected_accounts: number = 0;
  pending_verification: number = 0;
  pending_approval: number = 0;
  user_information_id: number;
  addPopupVisible: boolean;
  ActiveUserAccountss: any;
  application_code: number;
  data_record: any;
  deletePopupVisible: boolean;
  config_record: string;
  response: any;
  loading: boolean;
  UserTitleData: any;
  ActiveUserAccounts: any;
  AccountTypeData: any;
  CountriesData: any;
  IdentificationTypeData: any;
  secretariatDepartmentsData: any;
  is_eacsecretariat: boolean;
  instituionTypeData: any;
  has_partnerstate_defination: boolean;
  dashboard_type_id: number;
  partnerStatesData: any;
  userAccountTypeData: any;
  InstitutionDepartments: any;
  expertSelectionAndAppointmentForm: FormGroup;
  secretariateAccountss: any;
  Institutions: any;
  IdentificationType: any;
  Countries: any;
  userTitles: any;
  is_readonly: boolean = true;
  appointPopupVisible: boolean;
  usergroupPopupVisible: boolean;
  expressionofinterest_posting_id: number;
  show_advancesearch: boolean;
  alluserGroupData: any;
  accountStatuseData: any;
  AllInstitutionsdata: any;
  usrapprovalPopupVisible: boolean;
  decision_description: string;
  appworkflow_status_id: number;
  updateUsrPermissNewDataFrm: FormGroup;
  usrrejectionPopupVisible: boolean;
  apiUserAccounts: any;
  user_group_data: any;
  externalUsersData: any;
  userGroupId: number;
  permitActiveExpertAccountsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit/Preview User Account", action: 'edit_record', icon: 'fa fa-edit' },
        // { text: "Assign & Approve User Group", action: 'assign_group', icon: 'fa fa-edit' },
        // { text: "Approve User Account", action: 'approve_useraccount', icon: 'fa fa-file' },
        { text: "Disable/Reject User Account", action: 'disable_useraccount', icon: 'fa fa-trash' },
        { text: "View Profile", action: 'view_profile', icon: 'fa fa-eye' },
        { text: "Appoint Expert", action: 'appoint_expert', icon: 'fa fa-check' },
        // { text: "View User Operations", action: 'user_operations', icon: 'fa fa-file' },
      ]
    }
  ];

  permitSecretariateAccountsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit/Preview User Account", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Assign & Approve User Group", action: 'assign_group', icon: 'fa fa-edit' },
        // { text: "Approve User Account", action: 'approve_useraccount', icon: 'fa fa-file' },
        { text: "Disable/Reject User Account", action: 'disable_useraccount', icon: 'fa fa-trash' },
        { text: "View Profile", action: 'view_profile', icon: 'fa fa-eye' },
        
        // { text: "View User Operations", action: 'user_operations', icon: 'fa fa-file' },
      ]
    }
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
    private userservice:UserManagementService,
    private reportingAnalytics: ReportsService
  ) {
    
    // this.table_name = 'exp_expertsprofile_information';
    this.parameter_name = "Active User Accounts";


    

    this.userAccountFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      member_state_id: new FormControl('', Validators.compose([])),
      institution_type_id: new FormControl('', Validators.compose([])),
      institution_id: new FormControl('', Validators.compose([])),
      institution_department_id: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      secretariat_department_id: new FormControl('', Validators.compose([])),
      user_group_id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([])),
    });

    this.updateUsrPermissNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      member_state_id: new FormControl('', Validators.compose([])),
      institution_type_id: new FormControl('', Validators.compose([])),
      institution_id: new FormControl('', Validators.compose([])),
      institution_department_id: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      secretariat_department_id: new FormControl('', Validators.compose([])),
      user_group_id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),
    });

    this.expertSelectionAndAppointmentForm = new FormGroup({
      user_information_id: new FormControl('', Validators.compose([])),

      
    })

    this.onLoadAccountTypesData();
    // this.onLoadinstituionTypeData();
    this.fetchUserCountryOfOrigin();
    this.onLoadpartnerStatesData();
    this.fetchUserTitles()
    this.fetchUserIdentificationType();
    this.onloadUserTitleData();
    this.onLoadAllUserGroups();
    this.onLoadAccountTypeData();
    this.onLoadCountries();
    this.onLoadIdentificationTypeData();
    // this.onLoadsecreraitetDepartemData();
    this.spinnerHide();
    this.onLoadaccountStatuseData();
    // this.onLoadAllInstrutions();
    this.onLoadUserAccountStatusCounters();

  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onActionEditDetails() {
    this.is_readonly = false;
  }
  onLoadUserGroups(account_type_id) {
    var data_submit = {
      'table_name': 'usr_users_groups',
      'account_type_id': account_type_id
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userGroupData = this.data_record.data;
          }
        },
        error => {
          
        });
  }

  onLoadaccountStatuseData() {
    var data_submit = {
      'table_name': 'wf_workflow_statuses'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.accountStatuseData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  // onLoadAllInstrutions() {
  //   var data_submit = {
  //     'table_name': 'par_institutions'
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.AllInstitutionsdata = this.data_record.data;
  //         }
  //       },
  //       error => {
          
  //       });
  // }
  onLoadAllUserGroups() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.alluserGroupData = this.data_record.data;
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

  // onLoadsecreraitetDepartemData() {
  //   var data_submit = {
  //     'table_name': 'par_secretariat_departments'
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.secretariatDepartmentsData = this.data_record.data;
  //         }
  //       },
  //       error => {
          
  //       });
  // }

  fetchUserTitles() {
    var data_submit = {
      'table_name': 'usr_users_title'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userTitles = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onLoadpartnerStatesData() {
    var data_submit = {
      'table_name': 'par_countries',
      'is_member_state': true
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.partnerStatesData = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  fetchUserCountryOfOrigin() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.Countries = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  // onLoadinstituionTypeData() {
  //   var data_submit = {
  //     'table_name': 'par_institutions_types'
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.instituionTypeData = this.data_record.data;
  //         }
  //       },
  //       error => {
          
  //       });
  // }
  fetchUserIdentificationType() {
    var data_submit = {
      'table_name': 'usr_identification_type'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.IdentificationType = this.data_record.data;
          }
        },
        error => {
          
        });
  }
  onLoadAccountTypesData() {
    var data_submit = {
      'table_name': 'sys_account_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
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
  //onPatnerStateSelection
  onAccountTypeSelection($event) {

    if ($event.selectedItem) {

      let account_type = $event.selectedItem;
      this.onLoadUserGroups(account_type.id)

      this.dashboard_type_id = account_type.dashboard_type_id;
      this.has_partnerstate_defination = account_type.has_partnerstate_defination;
      this.is_eacsecretariat = account_type.is_eacsecretariat;

    } else {
      this.dashboard_type_id = 0;
      this.has_partnerstate_defination = false;
      this.is_eacsecretariat = false;
    }

    if (!this.has_partnerstate_defination) {
      this.userAccountFrm.get('institution_id')?.clearValidators();
      this.userAccountFrm.get('institution_department_id')?.clearValidators();
      this.userAccountFrm.get('institution_type_id')?.clearValidators();
    }
    else {
      this.userAccountFrm.get('institution_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.userAccountFrm.get('institution_department_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.userAccountFrm.get('institution_type_id')?.setValidators([Validators.required]);
    }
  }
  // onInstitutionChange(institution_id) {

  //   this.onLoadInstitutionDepartments(institution_id);

  // }
  // onLoadInstitutionDepartments(institution_id) {
  //   var data_submit = {
  //     'table_name': 'par_institutions_department',
  //     'institution_id': institution_id
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.InstitutionDepartments = this.data_record.data;
  //         }
  //       },
  //       error => {
          
  //       });
  // }
  // onPartnerStateChange(member_state_id) {
  //   let institution_type_id = this.userAccountFrm.get('institution_type_id')?.value;

  //   this.onLoadInstitutions(institution_type_id, member_state_id);

  // }
  // onInstitutionTypeChange(institution_type_id) {
  //   let member_state_id = this.userAccountFrm.get('member_state_id')?.value;

  //   this.onLoadInstitutions(institution_type_id, member_state_id);
  // }
  // onLoadInstitutions(institution_type_id, member_state_id) {
  //   this.spinnerShow('Loading Institutions Details');
  //   var data_submit = {
  //     'table_name': 'par_institutions',
  //     'institution_type_id': institution_type_id,
  //     'member_state_id': member_state_id
  //   }
  //   this.userManagementService.onLoadUserData(data_submit)
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.Institutions = this.data_record.data;
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
          
  //         this.spinnerHide();
  //       });
  // }

  onAddActiveUserAccountsClick() {
    this.is_readonly = false;
    this.addPopupVisible = true;
    this.userAccountFrm.reset();
  }

  onLoadIdentificationTypeData() {

    var data_submit = {
      'table_name': 'usr_identification_type'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          
          if (this.data_record.success) {
            this.IdentificationTypeData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onLoadCountries() {

    var data_submit = {
      'table_name': 'par_countries',
      is_enabled: true,
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          
          if (this.data_record.success) {
            this.CountriesData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  onLoadAccountTypeData() {

    var data_submit = {
      'table_name': 'sys_account_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          
          if (this.data_record.success) {
            this.AccountTypeData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  onloadUserTitleData() {

    var data_submit = {
      'table_name': 'usr_users_title'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          
          if (this.data_record.success) {
            this.UserTitleData = this.data_record.data;
          }

        },
        error => {
          
        });

  }
  
  fetchUserDetails(appworkflow_status_id= 0, is_eacsecretariat=true) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_users_information',
      'appworkflow_status_id': appworkflow_status_id,
      // is_eacsecretariat: is_eacsecretariat
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.ActiveUserAccounts = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          
        });

  }

  fetchApiUserDetails(appworkflow_status_id= 0, is_eacsecretariat=true) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_api_users',
      // 'appworkflow_status_id': appworkflow_status_id,
      // is_eacsecretariat: is_eacsecretariat
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetApiUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.apiUserAccounts = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          
        });

  }

  fetchExternalUserDetails(appworkflow_status_id= 0, is_eacsecretariat=true) {
    this.spinnerShow('Loading Active Users ...........');

    var data_submit = {
      'table_name': 'usr_external_users',
      // 'appworkflow_status_id': appworkflow_status_id,
      // is_eacsecretariat: is_eacsecretariat
    }
    this.userManagementService.onGetUserInformation(data_submit, 'onGetExternalUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.externalUsersData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          
        });

  }
  

  // fetchExpertDetails(appworkflow_status_id= 0, is_eacsecretariat=false) {
  //   this.spinnerShow('Loading Active Users ...........');

  //   var data_submit = {
  //     'table_name': 'usr_users_information',
  //     'appworkflow_status_id': appworkflow_status_id,
  //     is_eacsecretariat: is_eacsecretariat
  //   }
  //   this.userManagementService.onGetUserInformation(data_submit, 'onGetExpertInformation')
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
  //           this.ActiveUserAccountss = this.data_record.data;
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
          
  //       });

  // }



  permitActiveUserAccountsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.is_readonly = true;

      this.funcEditDetails(data);
    } else if (action_btn.action === 'view_profile') {
      this.is_readonly = true;
      this.funcprofileDetails(data);
    }else if (action_btn.action == 'assign_group') {
      this.is_readonly = true;
      this.funcAssignUserGroupdDetails(data, 2);
    }else if (action_btn.action === 'approve_useraccount') {

      this.decision_description = 'Approve User Account ';
      this.funcApprovaUserData(data, 2);
    }else if (action_btn.action === 'appoint_expert') {
      this.decision_description = 'Appoint Expert Account ';
      this.funcappointExpert(data, 9);
    } else if (action_btn.action === 'disable_useraccount') {
      this.decision_description = 'Reject/Disable User Account ';
      this.funcRejectUserData(data, 3);
    }
    else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }

  }

  
  funcApprovaUserData(data, decision_id) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.usrapprovalPopupVisible = true;

  }

  funcRejectUserData(data, decision_id) {
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.usrrejectionPopupVisible = true;
  }

  funcappointExpert(data, decision_id){
    this.userAccountFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.appworkflow_status_id = decision_id;
    this.appointPopupVisible = true;
  }
  onPopupHidden() {
    this.fetchUserDetails(0,this.is_eacsecretariat);
  }



  funcAssignUserGroupdDetails(data, decision_id) {
    this.updateUsrPermissNewDataFrm.patchValue(data.data);
    this.usergroupPopupVisible = true;
    this.appworkflow_status_id = decision_id;
    this.is_readonly = true;

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



  onCancelPopupClick() {
    this.approvalPopupVisible = false;
  }

  // onconfirmInitiateSelectionAndAppoitment() {
  //   // Save the details
  //   this.expertSelectionAndAppointmentForm.get('user_information_id')?.setValue(this.user_information_id)

  //   // Show spinner while processing
  //   this.spinnerShow('Initiating Selection and Appointment of Experts ');

  //   this.eoiService.onSaveExpressionOfInterestSDetails(this.table_name, this.expertSelectionAndAppointmentForm.value, 'onInitiateExpertsSelectionAndAppointment')
  //     .subscribe(
  //       response => {
  //         this.response = response;
  //         if (this.response.success) {
  //           this.application_code = this.response.application_code;
  //           this.eoiService.setApplicationDetail(this.response.record);
  //           const targetRoute = '/admin-ecres/expert-selectionandappointment';
  //           this.router.navigate([targetRoute])
  //             .then(navigationSuccess => {
  //               if (navigationSuccess) {
  //                 this.toastr.success(this.response.message, 'Response');
  //                  this.scrollToTop();
  //               } else {
  //                 this.toastr.error('Navigation to the route failed', 'Alert');
  //               }
  //             })
  //             .catch(error => {
  //               this.toastr.error('Navigation error: ' + error.message, 'Alert');
  //             });
  //         } else {
  //           this.toastr.error(this.response.message, 'Alert');
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
  //         this.toastr.error('Error Occurred: ' + error.message, 'Alert');
  //         this.spinnerHide();
  //       });
  // }


  // onconfirmInitiateSelectionAndAppoitment() {
  //   this.spinnerShow(this.decision_description + ' Expert Account.......................... ');

  //   this.userManagementService.onconfirmInitiateSelectionAndAppoitment(this.userAccountFrm.value, this.appworkflow_status_id, this.decision_description)
  //     .subscribe(
  //       response => {
          
  //         this.response = response;
  //         if (this.response.success) {
  //           this.fetchExpertDetails(0, this.is_eacsecretariat);
  //           this.appointPopupVisible = false;
  //           this.toastr.success(this.response.message, 'Response');
  //         }
  //         else {

  //           this.toastr.success(this.response.message, 'Response');

  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
  //         this.loading = false;
  //       });

  // }


  onDeleteUserData() {
    this.spinner.show();
    this.userManagementService.onDeleteUserData(this.userAccountFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0,this.is_eacsecretariat);
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

  onUserAccountApproval() {
    this.spinnerShow(this.decision_description + ' User Account.......................... ');

    this.userManagementService.onUserAccountApproval(this.userAccountFrm.value, this.appworkflow_status_id, this.decision_description)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0,this.is_eacsecretariat);
            this.usrapprovalPopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
        });

  }

  onUserAccountRejection() {
    this.spinnerShow(this.decision_description + ' User Account.......................... ');

    this.userManagementService.onUserAccountRejection(this.userAccountFrm.value, this.appworkflow_status_id, this.decision_description)
      .subscribe(
        response => {
          
          this.response = response;
          if (this.response.success) {
            this.fetchUserDetails(0, this.is_eacsecretariat);
            this.usrrejectionPopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
        });

  }
  onsaveActiveUserAccountsDetails() {
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
    this.userservice.onUserAccountRegistration(this.userAccountFrm.value, 'onsaveUserData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchUserDetails(0,this.is_eacsecretariat);
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
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }


  onsaveUserGroupDetails() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.updateUsrPermissNewDataFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.updateUsrPermissNewDataFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.userManagementService.onsaveUserData(this.table_name, this.updateUsrPermissNewDataFrm.value, 'onsaveUserGroupDetails')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchUserDetails(0,this.is_eacsecretariat);
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

  onLoadUserAccountStatusCounters() {

    this.userManagementService.onLoadUserAccountStatusCounters()
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            let records = this.data_record.data;
            // this.dtPremisesApplicationData = data.data;
            for (let rec of records) {
              if (rec.appworkflow_status_id == 1) {
                this.pending_approval = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 2) {
                this.active_accounts = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 3) {
                this.pending_verification = rec.statuses_counter;
              } if (rec.appworkflow_status_id == 4) {
                this.rejected_accounts = rec.statuses_counter;
              }
            }
          }

        },
        error => {
          
        });

  }
  onReloadUserCounter() {
    this.fetchUserDetails(0,this.is_eacsecretariat);
    this.onLoadUserAccountStatusCounters();
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