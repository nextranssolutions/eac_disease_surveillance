import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrl: './form-fields.component.css'
})
export class FormFieldsComponent {
  modulesData: any;
  parameter_name: string;
  table_name: string;
  spinnerMessage: string;
  show_advancesearch: boolean;
  loadingVisible = false;
  data_record: any;
  decryptedPayload: any;
  formFieldsData: any;
  formFieldTypeData: any;
  hasReadpermissions: boolean;
  onAddFormVisible: boolean;
  formTypeFrm: FormGroup;
  isChecked: boolean = false;
  is_combo_fieldtype: boolean;
  tableListData: any;
  subModulesData: any;
  enable_disableOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  has_addnewrelation_data:boolean;
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
  response: any;
  config_record: string;
  enablePopupVisible: boolean;
  enabledisable_formtype: string;
  is_enabled: boolean;
  deletePopupVisible: boolean;
  enabledisable_formtypedescription: string;
  loading: any;
  confirmationData = [
    { value: true, text: 'Yes', data_value: 1 },
    { value: false, text: 'No', data_value: 0 },
  ];
  has_relation:boolean;
  
  constructor(
    private spinner: SpinnerVisibilityService,
    public toastr: ToastrService,
    public utilityService: UtilityService,
    public reportingAnalytics: ReportsService,
    public configService: ConfigurationsService,
    public encryptionService: EncryptionService

  ) {
    this.table_name = 'cfg_formfield_configuration';
    this.parameter_name = "form_fields";

  }

  ngOnInit() {

    this.formTypeFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([])),
      form_field_type_id: new FormControl('', Validators.compose([])),
      label: new FormControl('', Validators.compose([])),
      table: new FormControl('', Validators.compose([])),
      valuefield: new FormControl('', Validators.compose([])),
      displayfield: new FormControl('', Validators.compose([])),
      order_no: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      relation_defination: new FormControl('', Validators.compose([])),
      filter_defination: new FormControl('', Validators.compose([])),
      is_autoloaded: new FormControl('', Validators.compose([])),
      has_relation: new FormControl('', Validators.compose([])),
      has_addnewrelation_data: new FormControl('', Validators.compose([])),
      has_addnewforeignrelation_data: new FormControl('', Validators.compose([])),
      foreignrelation_name: new FormControl('', Validators.compose([])),
      foreignrelation_table: new FormControl('', Validators.compose([])),
      foreignrelation_valuefield: new FormControl('', Validators.compose([])),
      foreignrelation_displayfield: new FormControl('', Validators.compose([])),
    });

    this.onLoadModulesData();
    this.onLoadApplicationtablsList();
    this.fetchConfigurationItemsDetails();

    this.onLoadformFieldTypeData();
    this.onLoadSubModulesData();
  }

  onLoadApplicationtablsList() {
    var data = {
      table_name: 'mis_tables',
      // is_enabled: 1,
    }
    this.configService.onLoadApplicationtablsList(data)
      .subscribe(
        data => {
          // 
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.tableListData = this.data_record.tables;
          }
        });

  }
  onLoadModulesData() {
    var data = {
      table_name: 'cfg_regulatory_functions',
      //is_enabled: 1,
    }
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          // 
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.modulesData = this.data_record.data;
          }

        });

  }

  onLoadSubModulesData() {
    var data = {
      table_name: 'cfg_regulatory_subfunctions',
      is_enabled: 1,
    }
    this.configService.onLoadConfigurationData(data)
      .subscribe(
        data => {
          // 
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.subModulesData = this.data_record.data;
          }

        });

  }




  onCellPrepared(e) {
    this.utilityService.onCellCountriesPrepared(e);
  }

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
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
            this.formFieldsData = this.data_record.data;
          }
          this.spinnerHide();
        });
  }

  onLoadformFieldTypeData() {

    var data_submit = {
      'table_name': 'cfg_form_field_types',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.formFieldTypeData = this.data_record.data;
          }

        },
        error => {

        });

  }



  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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
    else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    }
    else if (action_btn.action === 'configure_fields') {
      this.funcEnableDisableRecord(data);
    }
  }
  funcEditDetails(data) {
    this.formTypeFrm.patchValue(data.data);
    this.onAddFormVisible = true;
  }
  funcDeleteDetails(data) {
    this.formTypeFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
  }

  funcEnableDisableRecord(data) {
    this.formTypeFrm.patchValue(data.data);

    this.config_record = data.data.name;
    this.is_enabled = data.data.is_enabled;
    if (this.is_enabled) {
      this.enabledisable_formtype = "disable_configuration_item";
      this.enabledisable_formtypedescription = "are_you_sure_you_want_to_disableconfigurationitem";
    }
    else {
      this.enabledisable_formtype = "enable_configuration_item";
      this.enabledisable_formtypedescription = "are_you_sure_you_want_to_enableconfigurationitem";
    }
    this.enablePopupVisible = true;
  }
  onAddFormType() {
    this.formTypeFrm.reset();
    this.onAddFormVisible = true;

  }
  onFuncSaveFormData() {

    const formData = new FormData();
    const invalid = [];
    const controls = this.formTypeFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.formTypeFrm.invalid) {
      return;
    }
    this.spinnerShow('saving ' + this.parameter_name);
    this.configService.onSaveConfigurationDetailsDetails(this.table_name, this.formTypeFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.fetchConfigurationItemsDetails();
            this.onAddFormVisible = false;
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
  
  onHasAddNewReleationSelectionChange($event){
    if ($event.selectedItem) {

      let field_type = $event.selectedItem,
      data_value = field_type.data_value;
        if(data_value == 1){
          this.has_addnewrelation_data = true;
        }else{
          this.has_addnewrelation_data = false;
        }
    }
    else{
      this.has_addnewrelation_data = false;
    }
  }
  onHasRelationSelectionChange($event){
    if ($event.selectedItem) {

      let field_type = $event.selectedItem,
      data_value = field_type.data_value;
        if(data_value == 1){
          this.has_relation = true;
        }else{
          this.has_relation = false;
        }
    }
    else{
      this.has_relation = false;
    }
  }
  onFormFieldTypesSelectionChange($event) {

    if ($event.selectedItem) {

      let field_type = $event.selectedItem,
        field_type_id = field_type.id;

      if (field_type_id == 6) {
        this.is_combo_fieldtype = true;
      }
      else {
        this.is_combo_fieldtype = false;
      }
    }
    else {
      this.is_combo_fieldtype = false;
    }
  }

  onDeleteConfigurationsDetails() {
    this.spinnerShow('deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.formTypeFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchConfigurationItemsDetails();
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

  iniateEnableDisableRecord() {

    this.spinnerShow('Saving_details');
    this.configService.onEnableConfigurationsDetails(this.formTypeFrm.value, this.table_name, this.parameter_name)
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
  
}
