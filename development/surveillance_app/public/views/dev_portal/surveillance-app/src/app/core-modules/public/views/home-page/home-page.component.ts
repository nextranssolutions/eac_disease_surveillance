import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DashbordManagementService } from 'src/app/core-services/dashboard-management/dashbord-management.service';
import { PublicDashboardService } from 'src/app/core-services/public-dashboard/public-dashboard.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import {EncryptionService} from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-home-page',
 
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  system_title: string = AppSettings.system_title;
  
  iconPosition: any = 'top';
  signInFrm: FormGroup;
  submitted = false;
  loading = false;
  message: string;
  success: boolean;
  email_address: string;
  islostpassword: boolean;
  isSignIn: boolean = true;
  forgotPasswordFrm: FormGroup;
  siteKey: any = AppSettings.siteKey;
  mis_url: string = AppSettings.mis_url;
  isLoggedIn: boolean;
  userGroupName: string = ''; // Initialize with an empty string or default value
  userFirstName: string = '';
  userCountryOfOrigin: string = '';
  auth_response: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  dashboard_link:any;
   dashboard_name:string;
   userData: any;
   response:any;
   encryptedPayload:any;
   decryptedPayload:any;
   passwordMode: DxTextBoxTypes.TextBoxType = 'password';
   passwordButton: DxButtonTypes.Properties = {
    icon: 'eyeopen',
    stylingMode: 'text',
    onClick: () => {
      this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
    },
  };

  slideshowDelay = 3000;

  valueChanged(e) {
    this.slideshowDelay = e.value ? 2000 : 0;
  }

  regulatoryFunctionData:any;
  private baseUrl;

  var_1: number;
  var_2: number;
  sum_var: number;
  searchExpertsProfileFrm:FormGroup;
  slides_information:any;
  constructor(
    
    private router: Router,
    public authService: AuthenticationService,
    public userservice:UserManagementService,
    public dashboardService: DashbordManagementService,
    public toastr: ToastrService,
    public publicservice: PublicDashboardService,
    private configService: ConfigurationsService,
    public viewRef: ViewContainerRef,
    public encryptionService: EncryptionService

  ) {
    const base_url = AppSettings.base_url;
  }

  ngOnInit() {
    this.authService.getUserGroupName().subscribe((userGroupName: string) => {
      this.userGroupName = userGroupName;
    });

    this.authService.getUserFirstName().subscribe((userFirstName: string) => {
      this.userFirstName = userFirstName;
    });

    this.authService.getCountryOfOrigin().subscribe((userCountryOfOrigin: string) => {
      this.userCountryOfOrigin = userCountryOfOrigin;
    });

    // Add this line to check the initial value
    
    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required]))
    });

    this.signInFrm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required])),
      email_address: new FormControl('', Validators.compose([Validators.required])),
      // sum_input: new FormControl('', Validators.compose([Validators.required]))

    });
    this.funcLoginCapture();
    this.searchExpertsProfileFrm = new FormGroup({
      experts_keywordsearch: new FormControl('', Validators.compose([])),
      experts_regulatoryfuncsearch: new FormControl('', Validators.compose([])),
      experts_regulatoryinstitutiontype: new FormControl('', Validators.compose([])),
      experts_regulatoryinstitution: new FormControl('', Validators.compose([])),
      experts_economicblock: new FormControl('', Validators.compose([])),
      experts_country: new FormControl('', Validators.compose([])),
      search_category: new FormControl('', Validators.compose([]))
    });
    this.onLoadcountriesData();
    this.onLoadregulatoryFunctionData();
    this.onLoadSlides_information();

  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onLoadregulatoryFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatoryFunctionData = this.decryptedPayload;
            // this.regulatoryFunctionData = this.data_record.data;
          }

        },
        error => {

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
  
  // LOGIN METHOD LOGIC START
  data_record:any;
  countriesData:any;
  onLoadcountriesData() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.countriesData = this.decryptedPayload;
            // this.countriesData = this.data_record.data;
          }
        },
        error => {

        });
  }
  funcLoginCapture() {
    this.var_1 = Math.floor(Math.random() * 11);
    this.var_2 = Math.floor(Math.random() * 11);

    this.sum_var = this.var_1 + this.var_2;

  }
  
  // handleButtonClick(): void {
  //   if (this.isSignIn) {
  //     this.onSignIn();
  //   } else {
  //     this.onFuncRecoverPasswordRequest();
  //   }
  // }

  funcReloadCapture() {
    this.funcLoginCapture();

  }
  
  helloWorld() {
    alert('Welcome')
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcCreateAccount() {
    this.router.navigate(['/public/sign-up']);
    this.scrollToTop();
  }//
  
  funcPublicNavigation() {

  }
  handleReset() {

  } onEmailValueChange($event) {
    this.email_address = $event.value;
  }
  handleExpire() {

  }
  handleLoad() {

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
  }  handleSuccess($event) {

  }
  funcLostPassord() {
    this.islostpassword = true;
  }

  funcRedirectToDashboard() {
    // Handle other status conditions if needed
    this.userData = localStorage.getItem('user');
    let user_data = JSON.parse(this.userData);
    // 
  // 
    // let dashboard_linktest = './partnerstates-ppm'; unified-dashboard
    
    if(user_data.dashboard_link){
      this.router.navigate([user_data.dashboard_link]);
      this.scrollToTop();

    }
    //

  //  this.router.navigate(['./admin-ecres/app-dashboard']);
  // this.scrollToTop();

  }

  funcUserLogOut() {
    this.spinnerShow('Logging Out');
    this.authService.funcUserLogOut();
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  
  onAutoLoadConfigurationItems(){
    this.onLoadregulatoryFunctionData();
    
    this.onLoadcountriesData();
}
onSearchExpertsProfile(selectedTabIndex){
    this.searchExpertsProfileFrm.get('selectedTabIndex')?.setValue(selectedTabIndex);
    this.publicservice.setApplicationDetail(this.searchExpertsProfileFrm.value);
    //reroute
    this.router.navigate(['./experts-profiles']);
    this.scrollToTop();

}

}