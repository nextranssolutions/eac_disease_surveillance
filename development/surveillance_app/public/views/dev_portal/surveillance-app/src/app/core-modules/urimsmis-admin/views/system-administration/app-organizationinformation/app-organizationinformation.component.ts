import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-app-organizationinformation',

  templateUrl: './app-organizationinformation.component.html',
  styleUrl: './app-organizationinformation.component.css'
})
export class AppOrganizationinformationComponent {
  @Input() resetcolumns: string;
  createNewDataFrm: FormGroup;
  isnewinformation: boolean;
  systemInformationData: any;
  show_advancesearch: boolean;
  hasReadpermissions: boolean;
  config_record: string;
  data_record: any;
  record_id: number;
  response: any;
  countryData: any;
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
    private reportingAnalytics: ReportsService,
    private admnistrationService: ServiceAdmnistrationService,
  ) {
    // this.resetcolumns = 'is_super_admin,institution_type_id,resetcolumns,account_type_id,routerLink,has_partnerstate_defination';
    this.table_name = 'sys_system_information';
    this.parameter_name = "organization_information";

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      system_name: new FormControl('', Validators.compose([])),
      system_acronym: new FormControl('', Validators.compose([])),
      organisation_name: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([])),
      country: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      image_path: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit(): void {
    this.fetchsystemInformation();
    this.onLoadcountryData();
  }


  onAddNewRecord() {
    this.createNewDataFrm.reset();
    this.isnewinformation = true;
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
    this.isnewinformation = true;
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


  // onSaveWorkflowDetailsDetails
  // onFuncSaveRecordData() {
  //   const formData = new FormData();
  //   Object.keys(this.createNewDataFrm.controls).forEach(key => {
  //     formData.append(key, this.createNewDataFrm.get(key)?.value);
  //   });
  //   // Object.keys(this.createNewDataFrm.controls).forEach(key => {
  //   //   const value = this.createNewDataFrm.get(key)?.value;
  //   //   formData.append(key, value ? value : ''); // Ensure null values are handled
  //   // });
    
  //   formData.append('table_name', this.table_name);
  //   formData.append('resetcolumns', this.resetcolumns);

  //   this.spinnerShow('Saving ' + this.parameter_name);
    
  //   this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, formData, 'onSaveSystemAdminWithImage')
  // .subscribe(
  //   response => {
  //      // Log the response
  //     this.response = response;
  //     if (this.response.success) {
  //       this.fetchsystemInformation();
  //       this.isnewproduct = false;
  //       this.record_id = this.response.record_id; // Ensure this is set
  //       this.createNewDataFrm.get('id')?.setValue(this.record_id);
  //       this.isnewinformation = false;
  //       this.toastr.success(this.response.message, 'Response');
  //     } else {
  //       this.toastr.error(this.response.message, 'Alert');
  //     }
  //     this.spinnerHide();
  //   },
  //   error => {
  //     this.toastr.error('Error Occurred', 'Alert');
  //     this.spinnerHide();
  //   });
  // }
  onFuncSaveRecordData() {

    const formData = new FormData();
    Object.keys(this.createNewDataFrm.controls).forEach(key => {
      formData.append(key, this.createNewDataFrm.get(key)?.value);
    });

    formData.append('table_name', this.table_name);
    formData.append('resetcolumns', this.resetcolumns);

    this.spinnerShow('saving ' + this.parameter_name);
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, formData, 'onSaveSystemAdminWithImage')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchsystemInformation();
            this.isnewproduct = false;
            this.record_id = this.response.record_id;
            this.createNewDataFrm.get('id')?.setValue(this.record_id);
            this.isnewinformation = false;
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

  // 

  onLoadcountryData() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
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
