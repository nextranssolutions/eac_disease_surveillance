
import { Component, Input, ViewContainerRef } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-shared-documentchecklistmng',
  templateUrl: './shared-documentchecklistmng.component.html',
  styleUrl: './shared-documentchecklistmng.component.css'
})
export class SharedDocumentchecklistmngComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;
  checklistTypesData: any;
  countriesinfoData: any[] = [];
  performanceScoringScaleData: any;
  createNewDataFrm: FormGroup;
  isnewproduct: boolean;
  show_advancesearch: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  processData: any;
  performancescoringScaleData: any;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  deletePopupVisible = false;
  data_record: any;
  config_record: string;
  Countries: any;
  documentTypeData: any;
  loadingVisible: boolean;
  spinnerMessage: string;
  notificationTypeData: any;
  documentTypesData: any;
  systemLabelsData: any;
  SystemLangaugesData: any;
  isMultiline: boolean = true;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Enable/Disable", action: 'enable_record', icon: 'fa fa-check' },
      ]
    }
  ];
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean

  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  decryptedPayload:any;
  constructor(
    private spinner: SpinnerVisibilityService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService
  ) {
    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      checklist_type_id: new FormControl(false, Validators.compose([])),
      document_type_id: new FormControl(false, Validators.compose([])),
      resetcolumns: new FormControl(this.resetcolumns, Validators.compose([])),
      performancescoring_scale_id: new FormControl('', Validators.compose([])),
      system_label_id: new FormControl('', Validators.compose([])),
      system_language_id: new FormControl('', Validators.compose([])),
      translation: new FormControl('', Validators.compose([])),
      is_default_language: new FormControl('', Validators.compose([])),
      notification_type_id: new FormControl('', Validators.compose([])),
      process_id: new FormControl('', Validators.compose([])),
      email_template: new FormControl('', Validators.compose([])),
      marks_allocated: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),

    });

  }

  ngOnInit() {
    // other initializations

    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
    this.onLoaddocumentTypeData();
    this.onLoadsystemLabelsData();
    this.onLoadprocessData();
    this.onLoadSystemLangaugesData();
    this.onLoadchecklistTypesData();
    this.onloadperformanceScoringScale();
    this.onLoadnotificationTypeData();
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onLoadnotificationTypeData() {

    var data_submit = {
      'table_name': 'ntf_notification_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.notificationTypeData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onloadperformanceScoringScale() {

    var data_submit = {
      'table_name': 'cfg_performancescoring_scales'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.performanceScoringScaleData = this.data_record.data;
          }
        },
        error => {

        });

  }
  onLoadchecklistTypesData() {

    var data_submit = {
      'table_name': 'chk_checklist_types',
      // 'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.checklistTypesData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onLoadSystemLangaugesData() {
    var data_submit = {
      'table_name': 'cfg_system_languages'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.SystemLangaugesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onAdvanceProductRegistrySearch(e){
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

  onActivatetheAdvanceSearch(e){

    this.show_advancesearch =  e.value;

}

  onLoadprocessData() {
    var data_submit = {
      'table_name': 'wf_processes'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.processData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoadsystemLabelsData() {
    var data_submit = {
      'table_name': 'cfg_system_labels'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.systemLabelsData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onLoaddocumentTypeData() {

    var data_submit = {
      'table_name': 'dms_document_types'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.documentTypeData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchConfigurationItemsDetails() {
    this.spinnerShow('Loading...........');
    var data_submit = {
      'table_name': this.table_name
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.countriesinfoData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }

  funcEnableDisableRecord(data) {
    this.createNewDataFrm.patchValue(data.data);

    this.config_record = data.data.name;
    this.is_enabled = data.data.is_enabled;
    if (this.is_enabled) {
      this.enabledisable_tracer = "disable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_disableconfigurationitem";

    }
    else {
      this.enabledisable_tracer = "enable_configuration_item";
      this.enabledisable_tracerdescription = "are_you_sure_you_want_to_enableconfigurationitem";
    }

    this.enablePopupVisible = true;
  }

  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchConfigurationItemsDetails();
            this.enablePopupVisible = false;
            this.toastr.success(this.response.message, 'Response');
            this.deletePopupVisible = false;
          }
          else {
            this.toastr.success(this.response.message, 'Response');
          }
          this.spinnerHide();
        },
        error => {
          this.loading = false;
          this.spinnerHide();
        });
  }


  onAddNewProduct() {
    this.isnewproduct = true;
    this.createNewDataFrm.reset();
  }

  onAddProductCategoryClick() {
    this.createNewDataFrm.reset();
    this.addPopupVisible = true;
  }
  onFuncSaveCountriesData() {

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

    this.spinnerShow('saving ' + this.parameter_name);
    this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.createNewDataFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchConfigurationItemsDetails();
            this.isnewproduct = false;
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

  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }
  finishFunction() {

  }

  onPopupHidden() {
    this.fetchConfigurationItemsDetails();
  }

  funcEditDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.isnewproduct = true;
  }
  funcDeleteDetails(data) {
    this.createNewDataFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcEditDetails(data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    } else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    } else if (action_btn.action === 'block_record') {
      this.funcDeleteDetails(data);
    }
  }
  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }
  onDeleteConfigurationsDetails() {

    this.spinnerShow('Deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchConfigurationItemsDetails();
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.response.message, 'Response');

          }

          this.deletePopupVisible = false;
          this.spinnerHide();
        },
        error => {
          this.loading = false;
          this.spinnerHide();
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