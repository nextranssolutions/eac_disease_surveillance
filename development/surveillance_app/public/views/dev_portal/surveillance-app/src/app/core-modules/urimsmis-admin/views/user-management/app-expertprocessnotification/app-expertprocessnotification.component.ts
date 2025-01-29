import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ExpertsprofileserviceService } from 'src/app/core-services/expertprofile/expertsprofileservice.service';
import { NotificationManagementService } from 'src/app/core-services/notification-management/notification-management.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UserManagementService } from 'src/app/core-services/user-management/user-management.service';
import { WokflowManagementService } from 'src/app/core-services/workflow-management/wokflow-management.service';

@Component({
  selector: 'app-app-expertprocessnotification',
  templateUrl: './app-expertprocessnotification.component.html',
  styleUrl: './app-expertprocessnotification.component.css'
})
export class AppExpertprocessnotificationComponent {
  parameter_name: string;
  loadingVisible: boolean;
  show_advancesearch: boolean;
  config_record: string;
  expertsprofileInformatioData: any;
  deletePopupVisible: boolean;
  isnewrecord: boolean;
  processData: any;
  templateData: any;
  CountriesData: any;
  fullTemplateData: any;
  templatData: any;
  userData: any;
  process_id: number;
  spinnerMessage: string;
  loading: boolean;
  showEmailTemplate: boolean;
  is_templatevisible: boolean;
  is_readonly: boolean = true;
  processNotificationFrm: FormGroup;
  table_name: string;
  data_record: any;
  notification_type_id: number;
  templateInformatioData: any;
  processNotificationData: any[] = [];
  isnewprocessNotification: boolean;
  hasReadpermissions: boolean;
  response: any;
  editorValue: string;
  popupVisible: boolean;
  is_expertprofilevisible: boolean;
  booleanOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' }
  ];

  toolbarButtonOptions: DxButtonTypes.Properties = {
    text: 'Show markup',
    stylingMode: 'text',
    onClick: () => this.popupVisible = true,
  };

  constructor(
    public toastr: ToastrService,
    private notificationService: NotificationManagementService,
    private workflowService: WokflowManagementService,
    private spinner: SpinnerVisibilityService,
    private userService: UserManagementService,
    private fb: FormBuilder,
    private reportingAnalytics: ReportsService,
    private expertsProfileService: ExpertsprofileserviceService
  ) {
    this.spinnerShow('Loading' + this.parameter_name);
    this.table_name = 'exp_processes_notifications';

    this.processNotificationFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      expertsprofile_information_id: new FormControl('', Validators.compose([])),
      sent_by: new FormControl('', Validators.compose([])),
      email_from: new FormControl('', Validators.compose([])),
      subject: new FormControl('', Validators.compose([])),
      has_email_template: new FormControl(false, Validators.compose([])),
      body: new FormControl('', Validators.compose([])),
      email_template_id: new FormControl('', Validators.compose([])),
      email_body: new FormControl('', Validators.compose([])),
    });



  }

  ngOnInit(): void {
    this.fetchProcessNotifications();
    this.onLoadprocessData();
    this.onLoadUserData();
    this.onLoadTemplateData();
    // this.onLoadTemlate();
    this.onLoadCountriesData();
  }


  onSearchExpertsprofiledetails() {

    this.spinnerShow('Loading Experts Profile Information ...........');

    var data_submit = {
      'table_name': 'exp_expertsprofile_information'
    }
    this.expertsProfileService.onGetExpertsProfileInformation(data_submit, 'onLoadExpertsprofiledetails')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.expertsprofileInformatioData = this.data_record.data;

            this.is_expertprofilevisible = true;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });

  }

  onSearchTemplatedetails() {

    this.spinnerShow('Loading Data ...........');

    var data_submit = {
      'table_name': 'ntf_email_templates'
    }
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.templateInformatioData = this.data_record.data;

            this.is_templatevisible = true;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });

  }

  onFuncSaveProcessesNotificationData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.processNotificationFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.processNotificationFrm.invalid) {
      return;
    }
    this.spinnerShow('saving ' + this.parameter_name);
    this.notificationService.onSaveNotificationDetailsDetails(this.table_name, this.processNotificationFrm.value, 'onsaveNotificationProcesses')
      .subscribe(
        response => {
          this.response = response;

          if (this.response.success) {
            this.fetchProcessNotifications();
            this.isnewprocessNotification = false;
            this.toastr.success(this.response.message, 'Response');

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


  fetchProcessNotifications() {
    this.spinnerShow('Loading Data...........');
    var data_submit = {
      'table_name': 'exp_processes_notifications',

    }
    this.notificationService.onLoadNotificationProcesses(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.processNotificationData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }


  onValueChangeTemplate($event) {


    if ($event.selectedItem) {

      let data = $event.selectedItem;

      this.onLoadTemplateData();
      // this.processNotificationFrm.patchValue(data);

    }

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

  onAddNewRecord() {
    this.processNotificationFrm.reset();
    this.isnewrecord = true;
  }

  onSelectedOption(e: any) {
    this.checkEmailTemplateVisibility(e.value);
  }

  checkEmailTemplateVisibility(value: string) {
    if (value === 'yes') {
      this.showEmailTemplate = true;
      this.processNotificationFrm.get('email_template_id')?.setValidators([Validators.required]);
    } else {
      this.showEmailTemplate = false;
      this.processNotificationFrm.get('email_template_id')?.clearValidators();
    }
    this.processNotificationFrm.get('email_template_id')?.updateValueAndValidity();
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



  onLoadTemplateData() {
    var data_submit = {
      'table_name': 'ntf_email_templates'
    };
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.templateData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching template data:', error);
        });
  }


  onLoadTemplate(process_id) {
    var data_submit = {
      'table_name': 'ntf_email_templates',
      process_id: process_id
    };
    this.workflowService.getWorkflowConfigs(data_submit)
      .subscribe(
        data => {
          this.data_record = data;

          if (this.data_record.success) {
            this.templatData = this.data_record.data;
          }
        },
        error => {
          console.error('Error fetching template data:', error);
        });
  }


  onLoadUserData() {
    var data_submit = {
      'table_name': 'exp_expertsprofile_information'

    }
    this.userService.onLoadUserData(data_submit)
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

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  funcDeleteDetails(data) {
    this.processNotificationFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }


  onDeleteDetails() {
    this.spinner.show();
    this.workflowService.onDeleteWorkflowsDetails(this.processNotificationFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchProcessNotifications();
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {

            this.toastr.error(this.response.message, 'Response');

          }

        },
        error => {
          this.loading = false;
        });

  }

  onLoadCountriesData() {
    var data_submit = {
      'table_name': 'par_countries'
    }
    this.expertsProfileService.onLoadExpertsConfigData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.CountriesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onFuncSelectProfileInformation(data) {
    this.processNotificationFrm.patchValue(data);
    this.is_expertprofilevisible = false;
  }

  onFuncTemplateInformation(data) {
    this.processNotificationFrm.patchValue(data);
    this.is_templatevisible = false;

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
