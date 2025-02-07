import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { OtpService } from 'src/app/core-services/otp/otp.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';


@Component({
  selector: 'app-appsign-in',
  templateUrl: './appsign-in.component.html',
  styleUrls: ['./appsign-in.component.css', './appsign-in.component.scss']
})

export class AppsignInComponent {
  response: any;
  systemGuidelines: any;
  userData: any;
  userAccountTypeData: any[] = [];
  system_title: string = AppSettings.system_title;
  signInFrm: FormGroup;
  submitted = false;
  data_record: any;
  loading = false;
  on_showsigninguidelines: boolean;
  message: string;
  guideline_option_id: number = 1;
  success: boolean;
  is_expertsprofile: boolean;
  dashboard_type_id: number;
  email_address: string;
  islostpassword: boolean;
  forgotPasswordFrm: FormGroup;
  siteKey: any = AppSettings.siteKey;
  mis_url: string = AppSettings.mis_url;
  is_otpdisabled: boolean = true;
  userGroupName: string = '';
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  tokenRequestCount: number = 0;
  loadingVisible: boolean;
  spinnerMessage: string;
  slideshowDelay = 3000;
  auth_response: any;
  isLoggedIn: boolean;
  dashboard_name: string;
  dashboard_link: any;
  email: string;
  password: string;
  valueChanged(e) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }
  slides_information:any;
  passwordMode: DxTextBoxTypes.TextBoxType = 'password';
  passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  private baseUrl;

  var_1: number;
  var_2: number;
  sum_var: number;
  decryptedPayload:any;

  constructor(
    public translate: TranslateService,
    private router: Router,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    public userservice: UserManagementService,
    public viewRef: ViewContainerRef,
    private configService: ConfigurationsService,
    private otpservice: OtpService,
    private reportingAnalytics: ReportsService,
    private admnistrationService: ServiceAdmnistrationService,
    public encryptionService: EncryptionService
  ) {
    // translate.addLangs(['English', 'French', 'Swahili']);
    // translate.setDefaultLang('English');
    const base_url = AppSettings.base_url;

  }
  ngOnInit() {

    

    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      experts_profile_no: new FormControl('', Validators.compose([])),
    });

    this.signInFrm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      // language: new FormControl('', Validators.compose([])),
      // sum_input: new FormControl('', Validators.compose([Validators.required])),
      otp_value: new FormControl('', Validators.compose([]))
    });

    // this.funcLoginCapture();
    // this.onLoadAccountTypesData();
  //  this.onLoadsystemSignInUpGuidelines();
    //this.onLoadSlides_information();
    // this.spinner.hide();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onLoadSlides_information() {
    this.spinnerShow('');
    var data_submit = {
      'table_name': 'not_slides_informations',
      'is_enabled': 1
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.slides_information = this.decryptedPayload;
            // this.slides_information = this.data_record.data;
          }

        },
        error => {

        });

  } 
  onAccountTypeSelection($event) {

    if ($event.selectedItem) {
      let account_type = $event.selectedItem;
      this.dashboard_type_id = account_type.dashboard_type_id;
      this.is_expertsprofile = account_type.is_expertsprofile;
    } else {
      this.dashboard_type_id = 0;
      this.is_expertsprofile = false;
    }

    if (!this.is_expertsprofile) {
      this.signInFrm.get('experts_profile_no')?.clearValidators();
    } else {
      this.signInFrm.get('experts_profile_no')?.setValidators([Validators.required]); // Add any other validators you need
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
  

  onSingInKeyDown(event: any) {
    if (event.event.key === 'Enter') {
      // Handle the Enter key press
      this.onSignIn();
    }
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onOtpRequest() {
    const emailControl = this.signInFrm.get('email_address');
    this.authService.requestToken();
    this.tokenRequestCount = this.authService.getTokenRequestCount();

    if (!emailControl || emailControl.invalid) {
      this.toastr.error('Please fill in a valid email address.', 'Error');
      return;
    }
    // 
    this.spinnerShow('Requesting OTP...');

    this.otpservice.onUserLoginOtpRequest(this.signInFrm.value, 'requestLoginOtp').subscribe(
      (data) => {
        // 
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
  funcLoginCapture() {
    this.var_1 = Math.floor(Math.random() * 11);
    this.var_2 = Math.floor(Math.random() * 11);

    this.sum_var = this.var_1 + this.var_2;

  }


  onSignIn() {
    // Clear localStorage before logging in 
    localStorage.clear();

    this.email = this.signInFrm.get('email_address')?.value;
    this.password = this.signInFrm.get('password')?.value;
    const otp_value = this.signInFrm.get('otp_value')?.value;

    // const formData = new FormData();
    // const invalid = [];
    const controls = this.signInFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.signInFrm.invalid) {
      return;
    }

    this.loading = true;
    this.spinnerShow('User Login........');
    this.authService.login(btoa(this.email), btoa(this.password), (otp_value))
      
      .subscribe(
        response => {
          this.auth_response = response;
          this.message = this.auth_response.message;
          this.success = this.auth_response.success;

          if (this.success) {
            let access_token = this.auth_response.access_token;
            let isLoggedIn = this.auth_response.isLoggedIn;
            if (access_token != '' && isLoggedIn) {
              this.toastr.success(this.message, 'Success!');
              // this.isLoggedIn = this.auth_response.isLoggedIn;
              this.dashboard_name = this.auth_response.dashboard_name;
              this.dashboard_link = this.auth_response.dashboard_link;
           
              const token = this.auth_response.authorisation.token;
              this.authService.storeToken(token);
              localStorage.setItem('isLoggedIn', this.auth_response.isLoggedIn);
              localStorage.setItem('user', JSON.stringify(this.auth_response));
              localStorage.setItem('token', this.auth_response.authorisation.token);
              
              localStorage.setItem('id', this.auth_response.expertsprofile_information_id);
              localStorage.setItem('id', this.auth_response.id);
              localStorage.setItem('user_group_name', this.auth_response.user_group_name);
              localStorage.setItem('first_name', this.auth_response.first_name);
              localStorage.setItem('country_of_origin_id', this.auth_response.country_of_origin);
              localStorage.setItem('other_names', this.auth_response.other_names);
              localStorage.setItem('email_address', this.auth_response.email_address);
              localStorage.setItem('userGroupId', this.auth_response.userGroupId);
              localStorage.setItem('account_type_name', this.auth_response.account_type_name);
              localStorage.setItem('account_type_id', this.auth_response.account_type_id);
              localStorage.setItem('user_group_id', this.auth_response.user_group_id);
              localStorage.setItem('userCountryOfOrigin', this.auth_response.countryName);
              localStorage.setItem('usr_loggedin_id', this.auth_response.usr_loggedin_id);
              localStorage.setItem('dashboard_link', this.auth_response.dashboard_link);
              localStorage.setItem('dashboard_name', this.auth_response.dashboard_name);

            
              this.isLoggedIn = true;

              this.router.navigate([this.dashboard_link]);
              this.scrollToTop();
              this.authService.isLoggedIn = true;
            } else {
              this.toastr.error(this.message, 'Alert!');
            }
            this.spinnerHide();
          }
          else {
            this.spinnerHide();
            this.toastr.error(this.message, 'Alert!');
          }
          this.spinnerHide();
        });
    //this.router.navigate(['/online-core-services']);
    //this.scrollToTop();
  }

  funcReloadCapture() {
    this.funcLoginCapture();

  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcCreateCustomerAccount() {
    this.router.navigate(['public/sign-up']);
    this.scrollToTop();
  }//

  onSignOnKeyPress(event) {

    if (event.key === 'Enter') {

      this.onSignIn();
    }

  } handleReset() {

  } onEmailValueChange($event) {
    this.email_address = $event.value;
  }
  funcLostPassord() {
    this.islostpassword = true;
  }

  funcRedirectToDashboard() {
    // Handle other status conditions if needed
    this.userData = localStorage.getItem('user');
    let user_data = JSON.parse(this.userData);
    //experts-operations
    this.router.navigate([user_data.dashboard_link]);
    this.scrollToTop();
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  funcUserLogOut() {
    this.spinnerShow('Logging Out');
    this.authService.funcUserLogOut();
  }

  onViewsignInGuidelines() {
    this.on_showsigninguidelines = true;
  }
  onFuncRecoverPasswordRequest() {

    const summation = this.forgotPasswordFrm.get('sum_input')?.value;

    const formData = new FormData();
    const invalid = [];
    const controls = this.forgotPasswordFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.forgotPasswordFrm.invalid) {
      this.toastr.warning('Please fill in all required fields.', 'Warning');

      return;
    }

    this.loading = true;
    this.spinnerShow('User Login........');

    this.userservice.onUserAccountRegistration(this.forgotPasswordFrm.value, 'onUserPasswordRequestRecovery').subscribe(
      (data) => {
        this.response = data;
        if (this.response.success) {
          // Inform the user about association with a sidebar group
          this.toastr.info(this.response.message, 'Info');
          this.islostpassword = false;
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
    //
  }
  onLoadAccountTypesData() {
    let data_submit = {
      'table_name': 'sys_account_types'
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

  onFuncreturntoDashboard() {
    this.islostpassword = false;
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
