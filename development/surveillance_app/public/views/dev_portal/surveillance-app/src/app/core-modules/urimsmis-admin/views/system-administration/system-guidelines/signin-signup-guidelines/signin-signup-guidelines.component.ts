import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-signin-signup-guidelines',
  templateUrl: './signin-signup-guidelines.component.html',
  styleUrl: './signin-signup-guidelines.component.css'
})
export class SigninSignupGuidelinesComponent {

  createNewDataFrm: FormGroup;
  table_name:string;
  parameter_name:string;
  resetcolumns:string;
  hasReadpermissions: boolean;
  isnewGuide: boolean;
  signinSignupGuideData: any = {};
  selectTextOnEditStart: boolean;
  data_record: any;
  guidelineOptionsData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  isnewrecord: boolean;
  response: any;
  record_id:number;
  deletePopupVisible = false;
  config_record:string;
  loading = false;

  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
      //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];

  constructor(
    public utilityService: UtilityService,
    private admnistrationService: ServiceAdmnistrationService,
    public toastr: ToastrService,
    private spinner: SpinnerVisibilityService,
    private reportingAnalytics: ReportsService,
  ) { 
    this.table_name = 'sys_signinsignup_guidelines';
    this.parameter_name = "signinsignup_guidelines";

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      guideline_option_id: new FormControl('', Validators.compose([Validators.required])),
      guideline_step_no: new FormControl('', Validators.compose([Validators.required])),
      guideline_label: new FormControl('', Validators.compose([Validators.required])),
      guideline_description: new FormControl('', Validators.compose([Validators.required])),
      is_enabled: new FormControl(true, Validators.compose([])),
      
    });
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

  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }
  ngOnInit() {
    this.onLoadSystemLangaugesData();
    this.fetchSigninSignupGuideDetails();
  }

  onLoadSystemLangaugesData() {
    var data_submit = {
      'table_name': 'par_guidelinesoptions',
      is_enabled: true
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.guidelineOptionsData = this.data_record.data;
          }
        },
        error => {

        });
  }
  spinnerShow(spinnerMessage){
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide(){
    this.loadingVisible = false;
  }

  onAddNewSigninSignupGuide() {
    this.createNewDataFrm.reset();
    this.isnewGuide = true;
  }

  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  onSavingSigninSignupGuide(e) {
  }

  onAddNewRecord() {
    this.createNewDataFrm.reset();
    this.isnewrecord = true;
  }
  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.isnewrecord = true;
  }

  fetchSigninSignupGuideDetails() {

    var data_submit = {
      'table_name': this.table_name,
        is_enabled:true
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.signinSignupGuideData = this.data_record.data;
            
          }
  
        },
        error => {
          
        });
  
  }
  onFuncSaveRecordData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.createNewDataFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.createNewDataFrm.invalid) {
      return;
    }
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
  
    this.spinnerShow('Saving '+this.parameter_name);
   
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, this.createNewDataFrm.value, 'onsaveSysAdminData')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.fetchSigninSignupGuideDetails();
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

  onDeleteDetails() {
    this.spinner.show();
    this.admnistrationService.onDeleteSystemAdministrationDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchSigninSignupGuideDetails();
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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
}

