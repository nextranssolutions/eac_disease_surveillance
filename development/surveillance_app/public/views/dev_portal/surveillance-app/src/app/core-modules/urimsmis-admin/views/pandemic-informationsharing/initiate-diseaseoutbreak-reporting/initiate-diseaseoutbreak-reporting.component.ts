import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgWizardConfig, NgWizardService, STEP_STATE, StepChangedArgs, THEME } from 'ng-wizard';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { InformationSharingService } from 'src/app/core-services/information-sharing/information-sharing.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-initiate-diseaseoutbreak-reporting',
  templateUrl: './initiate-diseaseoutbreak-reporting.component.html',
  styleUrl: './initiate-diseaseoutbreak-reporting.component.css'
})
export class InitiateDiseaseoutbreakReportingComponent {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden

  };
  isValidTypeBoolean: boolean;
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showNextButton: false,
      showPreviousButton: false
    }
  };
  response: any;
  application_code: number;
  app_reference_no: string;

  table_name: string = 'txn_pandemic_reportinginformation';
  pandemic_reportinginformation_id: number;
  dashboard_url: any = ['./admin-mis'];
  ReportingInfoForm: FormGroup;
  loadingVisible: boolean;
  spinnerMessage: string;
  ReportingPeriodTypeData: any;
  ReportingQuatersData: any;
  reportingYearData: any;
  PartnerStateData: any;
  data_record: any;
  institutionData: any;
  PandemicReportingTypeData: any;
  pandemicInformationSubmissionCommetns: any;
  is_readonlyfield: boolean;
  appworkflow_status_id: number = 1; show_advancesearch: boolean;
  PandemicSourceofInformationData: any;
  parameter_name: string = "Information Sharing on disease outbreaks"
  reportingInstitutionData: any;
  constructor(
    private router: Router,
    public toastr: ToastrService,
    public configService: ConfigurationsService,
    private formBuilder: FormBuilder,
    private infoService: InformationSharingService,
    private reportingAnalytics: ReportsService,
    public translate: TranslateService, public ngWizardService: NgWizardService
  ) {
    this.ReportingInfoForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      pandemicreporting_type_id: new FormControl('', Validators.compose([Validators.required])),
      reporting_period_type_id: new FormControl('', Validators.compose([Validators.required])),
      partner_state_id: new FormControl('', Validators.compose([Validators.required])),
      process_id: new FormControl('', Validators.compose([])),
      reporting_institution_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      reporting_period_from: new FormControl('', Validators.compose([Validators.required])),
      reporting_period_to: new FormControl('', Validators.compose([Validators.required])),
      reporting_quarter_id: new FormControl('', Validators.compose([])),
      source_ofinformation_id: new FormControl('', Validators.compose([Validators.required])),
      reporting_years_id: new FormControl('', Validators.compose([])),
    });


  }


  funcRedirectToRequest() {
    this.router.navigate(this.dashboard_url)
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onAdvancePandemicRegistrySearch(e) {
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
  nextStep() {
    this.ngWizardService.next();
  }

  previousStep() {
    this.ngWizardService.previous();
  }
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {

    //  
  }
  onSavePandemicReportingInformation() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.ReportingInfoForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.ReportingInfoForm.invalid) {
      return;
    }

    this.spinnerShow('Saving Stock Details');

    this.infoService.onSavePandemicReportingInformation(this.table_name, this.ReportingInfoForm.value, 'onSavePandemicReportingInformation')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            // this.onLoadStockDetails(); pandemic_reportinginformation_id
            this.pandemic_reportinginformation_id = this.response.pandemic_reportinginformation_id;
            this.application_code = this.response.application_code;
            this.app_reference_no = this.response.app_reference_no;
            this.ReportingInfoForm.get('id')?.setValue(this.pandemic_reportinginformation_id);

            this.ngWizardService.next();
            this.toastr.success(this.response.message, 'Response');
            this.spinnerHide();

          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          // 
          this.spinnerHide();
        },
        error => {
          this.toastr.error('Error Occurred', 'Alert');
          // 
          this.spinnerHide();
        });
  }
  myPreviousReportedRecords:any;
  is_showmypreviousentryreports:boolean;

  funcViewmyPreviousReports(){

    this.infoService.onLoadInformationSharingDataUrl(this.ReportingInfoForm.value, 'onloadmyPreviousDataReportingReports')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            if(this.data_record.data){
              this.myPreviousReportedRecords = this.data_record.data;
              this.is_showmypreviousentryreports = true;
            }
            else{
              this.toastr.error('No previous inventory report found under the account..', 'Alert');
            }
          }
          this.spinnerHide();
        },
        error => {
          console.error('Error fetching stock level reporting information data:', error); // Log the error
          this.spinnerHide();
        }
      );
  }
}
