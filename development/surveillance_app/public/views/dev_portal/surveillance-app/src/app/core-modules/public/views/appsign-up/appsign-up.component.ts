import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { CountryISO } from 'ngx-intl-tel-input-gg';
import { OtpService } from 'src/app/core-services/otp/otp.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { ValidationCallbackData } from 'devextreme/common';
import { DxValidatorComponent } from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

const sendRequest = function (value: string) {
  const invalidEmail = 'test@dx-email.com';
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
};

@Component({
  selector: 'app-appsign-up',
  templateUrl: './appsign-up.component.html',
  styleUrls: ['./appsign-up.component.css']
})

export class AppsignUpComponent {
  @ViewChild('targetValidator', { static: false }) validator: DxValidatorComponent;
  asyncValidation = (params: ValidationCallbackData) => sendRequest(params.value);
  phonePattern = /^[+]?(\d[\d\-()\s]{7,}\d)$/;
  phoneRules: DxTextBoxTypes.Properties['maskRules'] = {
    X: /[\d]/,
  };
  allCountries: any[] = [];
  Countries: any[] = [];
  userGroups: any[] = [];
  Institutions: any[] = [];
  InstitutionDepartments: any[] = [];
  userAccountTypeData: any[] = [];
  userTitles: any[] = [];
  IdentificationType: any[] = [];
  system_title: string = AppSettings.system_title;
  signUpFrm: FormGroup;
  isLoggedIn: any;
  currentStep: number = 1;
  systemGuidelines: any;
  termscheckbox: boolean;
  base_url: string = AppSettings.base_url;
  filesToUpload: Array<File> = [];
  data_record: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  response: any;
  var_1: number;
  var_2: number;
  sum_var: number;
  secretariatDepartmentsData: any;
  is_eacsecretariat: boolean;
  instituionTypeData: any;
  has_partnerstate_defination: boolean;
  dashboard_type_id: number;
  partnerStatesData: any;
  phoneForm: FormGroup;
  selectedCountry: string = '';
  
  phoneMaskInvalidMessage: string = '';
  phoneValidationMessage: string = '';
  on_showsigninguidelines: boolean;
  on_showsignupterms: boolean;
  guideline_option_id: number = 2;
  termsConditionsData: any;
  is_otpdisabled: boolean = true;
  preferredCountries: CountryISO[] = [CountryISO.Kenya, CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  decryptedPayload:any;
  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private userservice: UserManagementService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    private fb: FormBuilder,
    private reportingAnalytics: ReportsService,
    private otpservice: OtpService,
    private configService: ConfigurationsService,
    private admnistrationService: ServiceAdmnistrationService,
    public encryptionService: EncryptionService
  ) {

    this.spinnerShow('Loading Account Creation Details...........');

    this.spinner.show();

    this.signUpFrm = this.fb.group({
      user_title_id: new FormControl('', Validators.compose([Validators.required])),
      account_type_id: new FormControl('', Validators.compose([Validators.required])),
      country_of_origin_id: new FormControl('', Validators.compose([])),
      member_state_id: new FormControl('', Validators.compose([])),
      institution_type_id: new FormControl('', Validators.compose([])),
      institution_id: new FormControl('', Validators.compose([])),
      organization_name: new FormControl('', Validators.compose([])),
      registration_number: new FormControl('', Validators.compose([])),
      secretariat_department_id: new FormControl('', Validators.compose([])),
      identification_type_id: new FormControl('', Validators.compose([])),
      identification_number: new FormControl('', Validators.compose([])),
      first_name: new FormControl('', Validators.compose([Validators.required])),
      surname: new FormControl('', Validators.compose([])),
      other_names: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      phone_number: new FormControl('', Validators.compose([])),
      otp_value: new FormControl('', Validators.compose([Validators.required]))
    });
  }


  ngOnInit() {
    this.onLoadAccountTypesData();
    this.onLoadinstituionTypeData();
    this.onLoaduserGroupData();
    this.fetchUserCountryOfOrigin();
    this.onLoadpartnerStatesData();
    this.fetchUserTitles()
    this.fetchUserIdentificationType();
    this.spinnerHide();
    this.funcReloadCapture();
    this.onLoadsystemSignInUpGuidelines()
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcLoginCapture() {
    this.var_1 = Math.floor(Math.random() * 11);
    this.var_2 = Math.floor(Math.random() * 11);
    this.sum_var = this.var_1 + this.var_2;
  }
  funcReloadCapture() {
    this.funcLoginCapture();
  }

  onLoadsystemSignInUpGuidelines() {
    var data_submit = {
      'table_name': 'sys_signinsignup_guidelines',
      'guideline_option_id': this.guideline_option_id
    }
    this.spinnerShow('Loading guidelines...');

    this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadsystemSignInUpGuidelines')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemGuidelines = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        }
      );
  }
  onLoadsecreraitetDepartemData() {
    var data_submit = {
      'table_name': 'par_secretariat_departments'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.secretariatDepartmentsData = this.decryptedPayload;
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
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.partnerStatesData = this.decryptedPayload;
          }
        },
        error => {

        });
  }
  onLoadinstituionTypeData() {
    var data_submit = {
      'table_name': 'par_institutions_types',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.instituionTypeData = this.decryptedPayload;
          }
        },
        error => {

        });
  }
  onLoadAccountTypesData() {
    var data_submit = {
      'table_name': 'sys_account_types',
      'has_selfregistration': true,
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.userAccountTypeData = this.decryptedPayload;
          }
        },
        error => {

        });
  }

  onLoaduserGroupData() {
    var data_submit = {
      'table_name': 'usr_users_groups'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.userGroups = this.decryptedPayload;
          }
        },
        error => {

        });
  }
  selectedCountryCode: string = '+1'; // Default country code
  phoneNumber: string = '';
  phoneMask: string = ''; // Dynamic phone mask
  phoneMaskRules = { 'X': /[0-9]/ }; // General mask rules for digits
  onCountrySelection($event) {

    if ($event.selectedItem) {
      let country_data = $event.selectedItem,
          country_code = '+'+country_data.phonecode;
      this.signUpFrm.get('phone_number')?.setValue(country_code)

    }
  }
  onAccountTypeSelection($event) {

    if ($event.selectedItem) {

      let account_type = $event.selectedItem;
      this.dashboard_type_id = account_type.dashboard_type_id;
      this.has_partnerstate_defination = account_type.has_partnerstate_defination;
      this.is_eacsecretariat = account_type.is_eacsecretariat;
    } else {
      this.dashboard_type_id = 0;
      this.has_partnerstate_defination = false;
      this.is_eacsecretariat = false;
    }

    if (!this.has_partnerstate_defination) {
      this.signUpFrm.get('institution_id')?.clearValidators();
      this.signUpFrm.get('institution_department_id')?.clearValidators();
      this.signUpFrm.get('institution_type_id')?.clearValidators();

    }
    else {
      this.signUpFrm.get('institution_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.signUpFrm.get('institution_department_id')?.setValidators([Validators.required]); // Add any other validators you need
      this.signUpFrm.get('institution_type_id')?.setValidators([Validators.required]);
    }
  }

  onCountryChange(event: any) {
    const countryCode = event.dialCode;
    this.signUpFrm.get('phone_number')?.setValue(`+${countryCode} `);
  }
  onInstitutionChange(institution_id) {

    this.onLoadInstitutionDepartments(institution_id);

  }
  onLoadInstitutionDepartments(institution_id) {
    var data_submit = {
      'table_name': 'par_institutions_department',
      'institution_id': institution_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.InstitutionDepartments = this.decryptedPayload;
          }
        },
        error => {

        });
  }
  onPartnerStateChange(member_state_id) {
    let institution_type_id = this.signUpFrm.get('institution_type_id')?.value;
    this.onLoadInstitutions(institution_type_id, member_state_id);

  }
  onInstitutionTypeChange(institution_type_id) {
    let member_state_id = this.signUpFrm.get('member_state_id')?.value;

    this.onLoadInstitutions(institution_type_id, member_state_id);
  }
  onLoadInstitutions(institution_type_id, member_state_id) {
    this.spinnerShow('Loading Institutions Details');
    var data_submit = {
      'table_name': 'par_institutions',
      'institution_type_id': institution_type_id,
      'member_state_id': member_state_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.Institutions = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }

  fetchUserTitles() {
    var data_submit = {
      'table_name': 'usr_users_title',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.userTitles = this.decryptedPayload;
          }
        },
        error => {

        });
  }

  fetchUserCountryOfOrigin() {
    var data_submit = {
      'table_name': 'par_countries',
    };
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.Countries = this.decryptedPayload;
          }
        },
        error => {

        });
  }


  fetchUserIdentificationType() {
    var data_submit = {
      'table_name': 'usr_identification_type',
      'is_enabled': true
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.IdentificationType = this.decryptedPayload;
          }
        },
        error => {

        });
  }

  fetchMemberCountryOfOrigin() {
    var data_submit = {
      'table_name': 'par_countries',
      is_member_state: 1
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.allCountries = this.decryptedPayload;
            this.Countries = this.allCountries;
          }
        },
        error => {

        });
  }

  filterCountries(accountType: any) {
    if (accountType.has_partnerstate_defination) {
      this.Countries = this.allCountries.filter(country => country.is_member_state);
    } else {
      this.Countries = this.allCountries;
    }
  }

  private prepareSavePermitDoc(): any {
    let input = this.signUpFrm.value;
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      input.append("file", files[i], files[i]['name']);
    }
    return input;
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onSignUp() {
    const isOptionalFields = true;
    const controls = this.signUpFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }

    this.spinnerShow('Creating Account...........');

    if (this.signUpFrm.valid) {
      this.userservice.onUserAccountRegistration(this.signUpFrm.value, 'onUserAccountRegistration').subscribe(
        (data) => {
          this.response = data;
          if (this.response.success) {
            this.toastr.info(this.response.message, 'Info');
            this.router.navigate(['/public/index']);
            this.scrollToTop();
          } else {
            this.toastr.success(this.response.message, 'Success');
          }

          this.spinnerHide()
        },
        (error) => {
          this.toastr.error('Registration failed: ' + error.error.message, 'Error', { timeOut: 10000 });
          this.spinnerHide()
        }
      );

    } else {
      // Handle invalid form or fields
      this.toastr.warning('Please fill in all required fields.', 'Warning');
      this.spinnerHide()

    }
  }

  onOtpRequest() {
    const emailControl = this.signUpFrm.get('email_address');

    if (!emailControl || emailControl.invalid) {
      this.toastr.error('Please fill in a valid email address.', 'Error');
      return;
    }

    this.spinnerShow('Requesting OTP...');

    this.otpservice.onUserOtpRequest(this.signUpFrm.value, 'requestOtp').subscribe(
      (data) => {

        this.response = data;
        if (this.response.success) {
          this.toastr.info(this.response.message, 'Info');
          this.is_otpdisabled = false;
        } else {
          this.toastr.error(this.response.message, 'Error');
        }
        this.spinnerHide();
      },
      (error) => {
        this.toastr.error('Failed to request OTP: ' + (error.error?.message || 'Unknown error'), 'Error');
        this.spinnerHide();
      }
    );
  }
  submissionsTermscheckbox(e) {
    this.termscheckbox = e.value;
  }

  onSignInLink() {
    this.router.navigate(['/public/index']);
    this.scrollToTop();
  }

  onViewsignInGuidelines() {
    this.on_showsigninguidelines = true;
  }
  onViewsignupTermsConditions() {

    var data_submit = {
      'table_name': 'sys_termsconditions_details'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.termsConditionsData = this.decryptedPayload;
            this.on_showsignupterms = true;
          }
        },
        error => {

        });
  }


  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
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
