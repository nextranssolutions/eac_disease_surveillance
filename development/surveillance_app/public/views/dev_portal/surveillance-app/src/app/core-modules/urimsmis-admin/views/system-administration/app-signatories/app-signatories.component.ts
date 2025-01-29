import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-app-signatories',
 
  templateUrl: './app-signatories.component.html',
  styleUrl: './app-signatories.component.css'
})
export class AppSignatoriesComponent {
  createNewDataFrm: FormGroup;
  isnewrecord: boolean;
  systemInformationData: any;
  show_advancesearch: boolean;
  hasReadpermissions: boolean;
  config_record: string;
  processData: any;
  data_record: any;
  resetcolumns: string;
  userData: any;
  record_id: number;
  response: any;
  deletePopupVisible: boolean;
  isnewproduct: boolean;
  loadingVisible: boolean;
  spinnerMessage: string;
  table_name: string;
  parameter_name: string;
  loading: boolean;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  constructor(
    public toastr: ToastrService,
    private spinner: SpinnerVisibilityService,
    private workflowService: WokflowManagementService,
    private userService: UserManagementService,
    private reportingAnalytics: ReportsService,
    private admnistrationService: ServiceAdmnistrationService
  ) {

    this.table_name = 'wf_process_signatorydetails';
    this.parameter_name = "process_signatory";

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      user_id: new FormControl('', Validators.compose([])),
      signatory_title: new FormControl('', Validators.compose([])),
      active_from: new FormControl('', Validators.compose([])),
      active_to: new FormControl('', Validators.compose([])),
      image_path: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit(): void {
    this.fetchsystemInformation();
    this.onLoadprocessData();
    this.onLoadUserData();
  }


  onAddNewRecord() {
    this.createNewDataFrm.reset();
    this.isnewrecord = true;
  }

  onAdvanceProductRegistrySearch(e) {
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

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.isnewrecord = true;
  }


  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  spinnerShow(spinnerMessage){
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide(){
    this.loadingVisible = false;
  }

  onFuncSaveRecordData() {

    const formData = new FormData();
    Object.keys(this.createNewDataFrm.controls).forEach(key => {
      formData.append(key, this.createNewDataFrm.get(key)?.value);
    });

    formData.append('table_name', this.table_name);
    formData.append('resetcolumns', this.resetcolumns);

    this.spinnerShow('saving ' + this.parameter_name);
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, formData, 'onSaveSignatories')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchsystemInformation();
            this.isnewrecord = false;
            this.record_id = this.response.record_id;
            this.createNewDataFrm.get('id')?.setValue(this.record_id);
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
  fetchsystemInformation() {

    var data_submit = {
      'table_name': this.table_name
      
    }
    this.workflowService.onLoadWorkflowData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.systemInformationData = this.data_record.data;
            
          }
  
        },
        error => {
          
        });
  }

  onLoadprocessData() {
    var data_submit = {
      'table_name': 'wf_processes'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processData = this.data_record.data;
          }
        },
        error => {

        });

  }

  onLoadUserData() {
    var data_submit = {
      'table_name': 'usr_users_information'
      
    }
    this.userService.onGetUserInformation(data_submit, 'onGetUserInformation')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.userData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          
          this.spinnerHide();
        });
  }
 

  onDeleteDetails() {
    this.spinner.show();
    this.workflowService.onDeleteWorkflowsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchsystemInformation();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;          }
          else {

            this.toastr.error(this.response.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }

  onImageUploaded(event: any) {
    const file = event.file;  // DevExtreme specific
    if (file) {
      this.createNewDataFrm.patchValue({ image_path: file });
    } else {
      console.error('No file uploaded or file format is incorrect.');
    }
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
