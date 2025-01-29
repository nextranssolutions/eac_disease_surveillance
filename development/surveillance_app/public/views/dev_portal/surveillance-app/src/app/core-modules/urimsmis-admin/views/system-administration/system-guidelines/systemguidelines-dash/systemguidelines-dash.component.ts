import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-systemguidelines-dash',
  templateUrl: './systemguidelines-dash.component.html',
  styleUrls: ['./systemguidelines-dash.component.css'] // Corrected styleUrls
})
export class SystemguidelinesDashComponent {
  systemGuidelinesForm: FormGroup;
  systemFunctionalitiesData: any;
  dashboardTypeData: any;
  data_record: any;
  statuseData: any;
  data_resp: any;
  enable_approvalbtn: any;
  config_record: any;
  systemGuidelineData: any[] = [];
  loadingVisible: boolean;
  hasReadpermissions: boolean;
  deletePopupVisible: boolean;
  approvalPopupVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  previewtitle: string;
  application_code: number;
  appworkflow_status_id: number;
  process_id: number = 17;
  decryptedPayload:any;

  constructor(
    private reportingAnalytics: ReportsService,
    private router: Router,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private admnistrationService: ServiceAdmnistrationService,
    private formBuilder: FormBuilder,
    public encryptionService: EncryptionService
  ) {
    this.table_name = 'sys_systemguidelines_detail';
    this.parameter_name = "systemguidelines_detail";

    this.systemGuidelinesForm = this.formBuilder.group({
      id: new FormControl('', Validators.compose([])),
      systemguide_id: new FormControl('', Validators.compose([])),
      systems_functionality_id: new FormControl('', Validators.compose([])),
      guideline_step_no: new FormControl('', Validators.compose([])),
      guidelines: new FormControl('', Validators.compose([])),
      dashboard_type_id: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      app_reference_no: new FormControl('', Validators.compose([])),
      appworkflow_status_id: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.onLoadSystemFunctionalitiesData();
    this.onLoadDashboardTypeData(); 
    this.onLoadSystemGuideline();
    this.onLoadEoiStatusData(); 
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling for better UX
    });
  }
  onCellPrepared(e) {
    if (e.rowType === "data" && e.column.dataField === "appworkflow_status_id") {
      let appworkflow_status_id = e.data.appworkflow_status_id;

      if (appworkflow_status_id === 1) { 
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#57504d';
      } else if (appworkflow_status_id === 3) { 
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#8bbd78';
      } else if (appworkflow_status_id === 2) { 
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#78a5a3';
      } else if (appworkflow_status_id === 5) { 
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#fdb100';
      } else {
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#ce5a57';
      }
    }
  }

  onLoadDashboardTypeData() {
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
          // Handle error
        }
      );
  }

  onLoadEoiStatusData() {
    var data_submit = {
      'table_name': 'wf_workflow_statuses'
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.statuseData = this.data_record.data;
          }
        },
        error => {
          // Handle error
        }
      );
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
          // Handle error
        }
      );
  }

  onLoadSystemGuideline(appworkflow_status_id = 0) {
    this.spinnerShow('Loading Information ...........');
    var data_submit = {
      'table_name': this.table_name,
      'appworkflow_status_id': appworkflow_status_id
    }
    this.admnistrationService.onLoadDataUrl(data_submit, 'onLoadSystemGuideline')
      .subscribe(
        data => {
          this.data_record = data;
          
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemGuidelineData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
          // Handle error
        }
      );
  }

  spinnerShow(spinnerMessage: string) { // Added type annotation
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }

  spinnerHide() {
    this.loadingVisible = false;
  }

  funcpopWidth(percentage_width: number): number { // Added return type annotation
    return window.innerWidth * percentage_width / 100;
  }

  funcpopHeight(percentage_height: number): number { // Added return type annotation
    return window.innerHeight * percentage_height / 100;
  }

  funcInfActionClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPreviewExpertCredentials(data.data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data.data);
    } else if (action_btn.action === 'preview_record') { // Corrected action check
      this.funcPreviewData(data.data); // Corrected parameter
    }
  }

  singleApplicationActionColClick(data) {
    this.funcActionsProcess(data.action, data);
  }

  funcActionsProcess(action_btn: string, data: any) { // Added type annotations
    if (action_btn === 'edit_record') {
      this.funcPreviewExpertCredentials(data);
    }
  }

  funcPreviewExpertCredentials(data: any) { // Added type annotation
    this.admnistrationService.setApplicationDetail(data);
    this.router.navigate(['./admin-ecres/app-systemguidelines-detail']);
    this.scrollToTop();
  }

  funcDeleteDetails(data: any) { // Added type annotation
    this.admnistrationService.setApplicationDetail(data);
    this.config_record = data.name; // Corrected property access
    this.deletePopupVisible = true;
  }

  funcRedirectToPosting() {
    this.data_resp = {
      process_id: 17,
      app_refence_no: '' // Corrected typo
    }
    this.admnistrationService.setApplicationDetail(this.data_resp);
    this.router.navigate(['/admin-ecres/app-systemguidelines-detail']);
    this.scrollToTop();
  }

  funcPreviewData(data: any) { // Added type annotation
    this.enable_approvalbtn = false;
    this.systemGuidelinesForm.patchValue(data);
    this.previewtitle = "Preview Information";
    this.systemGuidelinesForm.get('dashboard_type_id')?.setValue(data.dashboard_type_id);
    this.onLoadSystemGuideline(data.id);
    this.appworkflow_status_id = data.appworkflow_status_id;
    this.application_code = data.application_code;
    this.process_id = data.process_id;
    this.approvalPopupVisible = true;
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
