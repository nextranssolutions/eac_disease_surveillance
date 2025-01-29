import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-systemguidelines-detail',
  templateUrl: './systemguidelines-detail.component.html',
  styleUrl: './systemguidelines-detail.component.css'
})
export class SystemguidelinesDetailComponent {
  systemGuidelinesForm: FormGroup;
  systemFunctionalitiesData: any;

  dashboardTypeData: any;
  data_record: any;
  data_resp: any;
  config_record:any;
  loading = false;
  systemGuidelinesData: any[] = [];
  loadingVisible: boolean;
  hasReadpermissions: boolean;
  deletePopupVisible: boolean;
  isShowAppProcessSubmission:boolean;
  approvalPopupVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  selectedTabIndex = 0;
  iconPosition: any = "top";
  systemguide_id: number;
  response: any;
  systemGuidelinesdata: any;
  app_reference_no: string;
  decision_description: string;
  previewtitle:string;
  application_code: number;
  appworkflow_status_id: number;
  document_type_id: number = 3;
  process_id = 17;
  dashboard_url:string ="/admin-ecres/app-systemguidelines-dash";
  decryptedPayload:any;

  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private admnistrationService: ServiceAdmnistrationService,
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'sys_systemguidelines_detail';
    this.parameter_name = "systemguidelines_detail";

    this.systemGuidelinesForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      // systemguide_id: new FormControl('', Validators.compose([])),
      systems_functionality_id: new FormControl('', Validators.compose([])),
      guideline_step_no: new FormControl('', Validators.compose([])),
      guidelines: new FormControl('', Validators.compose([])),
      dashboard_type_id: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
    });

    if (this.admnistrationService.getApplicationDetail()) {
      this.systemGuidelinesdata = this.admnistrationService.getApplicationDetail();
      this.app_reference_no = this.systemGuidelinesdata.app_reference_no;
      this.application_code = this.systemGuidelinesdata.application_code;
      this.systemguide_id = this.systemGuidelinesdata.systemguide_id;
      this.appworkflow_status_id = this.systemGuidelinesdata.appworkflow_status_id;
      this.process_id = this.systemGuidelinesdata.process_id;
      
      this.systemGuidelinesForm.patchValue(this.systemGuidelinesdata);
    }
    else {
      this.router.navigate([this.dashboard_url]);
      this.scrollToTop();
    }
  }

  ngOnInit() {
    this.onLoadSystemFunctionalitiesData();
    this.onloaddashboardTypeData();
    this.fetchSysGuidelinesDetails();
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  funcInfoTabClick(e) {
    let tab_index = e.itemIndex;

    if (tab_index > 0) {
      this.systemguide_id = this.systemGuidelinesForm.get('id')?.value;
      if (this.systemguide_id < 1) {
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      }
    }
  }

  onNextNavigationItems(nextStep) {
    // this.selectedTabIndex = nextStep;
    if (nextStep > 0) {
      this.systemguide_id = this.systemGuidelinesForm.get('id')?.value;

      if (this.systemguide_id < 1) {
        //validate the form based on saving 
        this.selectedTabIndex = 0;
        this.toastr.error('Kindly save details before moving to the next step.', 'Response');
      } else {

        this.selectedTabIndex = nextStep;
      }
    } else {
      this.selectedTabIndex = nextStep;
    }
  }

  onFuncSubmitApplication() {
    this.isShowAppProcessSubmission= true;
  }

  funcRedirectToDashboard() {
    this.router.navigate([this.dashboard_url]);
    this.scrollToTop();
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
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

  onAccountApproval() {}

  onloaddashboardTypeData() {

    var data_submit = {
      'table_name': 'sys_dashboard_types'
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.dashboardTypeData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadSystemFunctionalitiesData() {
    var data_submit = {
      'table_name': 'par_systems_functionalities'
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.systemFunctionalitiesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  // onLoadSystemGuideline(appworkflow_status_id = 0) {
  //   this.spinnerShow('Loading Information ...........');

  //   var data_submit = {
  //     'table_name': this.table_name,
  //     'appworkflow_status_id': appworkflow_status_id
  //   }
  //   this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadSystemGuideline')
  //     .subscribe(
  //       data => {
  //         this.data_record = data;
  //         if (this.data_record.success) {
    //this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
    //this.systemGuidelinesProcesses = this.decryptedPayload;
  //         }
  //         this.spinnerHide();
  //       },
  //       error => {
          
  //         this.spinnerHide();
  //       });
  // }

  fetchSysGuidelinesDetails() {

    var data_submit = {
      'table_name': this.table_name
    }
    this.admnistrationService.onLoadSystemGuideline(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.systemGuidelinesData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onSaveSystemGuideline() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.systemGuidelinesForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.systemGuidelinesForm.invalid) {
      this.toastr.error('Please fill in all mandatory fields.', 'Alert');
      return;
    }
   
    this.spinnerShow('Saving System Guideline .........');
    this.spinner.show();
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.systemGuidelinesForm.value, 'onSaveSystemGuideline')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.systemguide_id = this.response.systemguide_id;
            this.application_code = this.response.application_code;
            this.app_reference_no = this.response.app_reference_no;
            this.systemGuidelinesForm.get('id')?.setValue(this.systemguide_id);
            this.systemGuidelinesForm.get('application_code')?.setValue(this.application_code);
            this.selectedTabIndex = 1;
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          this.spinnerHide();
        });
  }

  onDeleteDetails() {
    this.spinner.show();
    this.admnistrationService.onDeleteSystemAdministrationDetails(this.systemGuidelinesForm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchSysGuidelinesDetails();
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.error(this.response.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }
}
