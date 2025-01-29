import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';


@Component({
  selector: 'demo-app',
  templateUrl: './app-myprofile.component.html',
  styleUrls: ['./app-myprofile.component.css'],
})

export class AppMyprofileComponent {
  userAccountFrm: FormGroup;
  spinnerMessage: string;
  loadingVisible: boolean;
  is_readonly: boolean = true;
  parameter_name: string; 
  response: any;
  data_record: any;
  userAccountTypeData: any;
  Countries: any;
  memberStatesData: any;
  dashboard_type_id: number;
  is_secretariat: boolean;
  has_memberstate_defination: boolean;
  Institutions: any;
  secretariatDepartmentsData: any;
  InstitutionDepartments: any;
  instituionTypeData: any;
  userTitles: any;
  IdentificationTypeData: any;
  isContentScrolled = false;
  isDataChanged = false;
  isLoading = true;

  constructor(
    // private dataService: DataService, 
    public toastr: ToastrService,
    private userManagementService: UserManagementService,
    private AuthService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userAccountFrm = new FormGroup({
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      partner_state_id: new FormControl('', Validators.compose([])),
      institution_type_id: new FormControl('', Validators.compose([])),
      institution_id: new FormControl('', Validators.compose([])),
      institution_department_id: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      secretariat_department_id: new FormControl('', Validators.compose([])),
      user_group_id: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([Validators.required])),
      identification_number: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      other_names: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      phone_number: new FormControl('', Validators.compose([Validators.required])),
    });

    this.onLoadAccountTypesData();
    this.fetchUserCountryOfOrigin();
    this.onGetSingleUserProfileDetails();
    this.onLoadinstituionTypeData();
    this.onLoadpartnerStatesData();
    this.fetchUserTitles()

    this.onLoadIdentificationTypeData();
    this.onLoadsecreraitetDepartemData();
    this.spinnerHide();
  }

  onActionEditDetails() {
    this.is_readonly = false;
  }

  onGetSingleUserProfileDetails(){
   
    var data_submit = {
      'table_name': 'usr_users_information'
    }
    this.spinnerShow('Loading user Profile Details');

    this.userManagementService.onGetSingleUserProfileDetails(data_submit)
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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

  onLoadpartnerStatesData() {
    var data_submit = {
      'table_name': 'par_countries',
      'is_partner_state': true
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.memberStatesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onAccountTypeSelection($event) {

    if ($event.selectedItem) {

      let account_type = $event.selectedItem;

      this.dashboard_type_id = account_type.dashboard_type_id;
      this.has_memberstate_defination = account_type.has_memberstate_defination;
      this.is_secretariat = account_type.is_secretariat;

    } else {
      this.dashboard_type_id = 0;
      this.has_memberstate_defination = false;
      this.is_secretariat = false;
    }

    if (!this.has_memberstate_defination) {
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

  onMemberStateChange(member_state_id) {
    let institution_type_id = this.userAccountFrm.get('institution_type_id')?.value;

    this.onLoadInstitutions(institution_type_id, member_state_id);

  }

  onInstitutionTypeChange(institution_type_id) {
    let partner_state_id = this.userAccountFrm.get('partner_state_id')?.value;

    this.onLoadInstitutions(institution_type_id, partner_state_id);
  }
  onLoadInstitutions(institution_type_id, partner_state_id) {
    this.spinnerShow('Loading Institutions Details');
    var data_submit = {
      'table_name': 'par_institutions',
      'institution_type_id': institution_type_id,
      'partner_state_id': partner_state_id
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.Institutions = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  onInstitutionChange(institution_id) {

    this.onLoadInstitutionDepartments(institution_id);

  }
  onLoadInstitutionDepartments(institution_id) {
    var data_submit = {
      'table_name': 'par_institutions_department',
      'institution_id': institution_id
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.InstitutionDepartments = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadsecreraitetDepartemData() {
    var data_submit = {
      'table_name': 'par_secretariat_departments'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.secretariatDepartmentsData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadinstituionTypeData() {
    var data_submit = {
      'table_name': 'par_institutions_types'
    }
    this.userManagementService.onLoadUserData(data_submit)
      .subscribe(
        data => {

          this.data_record = data;
          if (this.data_record.success) {
            this.instituionTypeData = this.data_record.data;
          }
        },
        error => {

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
    this.spinnerShow('Updating User details');

    this.userManagementService.onUserAccountRegistration(this.userAccountFrm.value, 'onUpdateUserProfileInformation')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');

          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide()
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide()
        });
  }

  scroll({reachedTop = false}) {
    this.isContentScrolled = !reachedTop;
  }


}
