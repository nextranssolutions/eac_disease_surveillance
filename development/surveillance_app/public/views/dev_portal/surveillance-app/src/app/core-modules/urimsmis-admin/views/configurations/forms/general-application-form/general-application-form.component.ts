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
  selector: 'app-general-application-form',

  templateUrl: './general-application-form.component.html',
  styleUrl: './general-application-form.component.css'
})
export class GeneralApplicationFormComponent {
  table_name: string;
  onaddApplicationFormFieldsWin: boolean;
  form_category_id: number;
  applicationFormFieldsData: any;
  parameter_name: string = "form_fields";
  isConfigureApplicationFormFields: boolean;
  spinnerMessage: string;
  show_advancesearch: boolean;
  loadingVisible = false;
  hasReadpermissions: boolean;
  onAddFormVisible: boolean;
  formtypesData: any[] = [];
  modulesData: any;
  subModulesData: any;
  subTableModulesData: any;
  sectionData: any;
  //  createNewDataFrm: FormGroup;
  isChecked: boolean;
  response: any;
  data_record: any;
  decryptedPayload: any;
  formFieldsData: any;
  formTypeFrm: FormGroup;
  prodCategoryData: any;
  premiseTypeData: any;
  deletePopupVisible = false;
  formFieldVisible = false;
  config_record: string;
  enablePopupVisible: boolean;
  enabledisable_formtype: string;
  enabledisable_formtypedescription: string;
  is_enabled: boolean;
  loading = false;
  enable_disableOptions = [
    { value: true, text: 'Yes', data_value: 1 },
    { value: false, text: 'No', data_value: 0 },
  ];
  regulatory_function_id: number;
  applicationforms_configuration_id: number;
  formfieldConfigurationData: any;

  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [

        { text: "Configure Fields", action: 'configure_fields', icon: 'fa fa-plus' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "enable/disable", action: 'enable_record', icon: 'fa fa-check' }
      ]
    }
  ];
  actionsFormFieldMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' }
      ]
    }
  ];

  applicationFormFieldsFrm: FormGroup;
  constructor(
    private spinner: SpinnerVisibilityService,
    // private router: Router,
    public toastr: ToastrService,
    // public viewRef: ViewContainerRef,
    // public translate: TranslateService,
    // public workflowService: WokflowManagementService,
    public utilityService: UtilityService,
    // public modalService: NgxSmartModalService,
    public reportingAnalytics: ReportsService,
    public configService: ConfigurationsService,
    public encryptionService: EncryptionService
  ) {

    this.table_name = 'cfg_applicationforms_configuration';
    this.parameter_name = "application_form";


  }

  ngOnInit() {
    this.formTypeFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      regulatory_function_id: new FormControl('', Validators.compose([])),
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([])),
      premise_type_id: new FormControl('', Validators.compose([])),
      prodclass_category_id: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
    });

    this.applicationFormFieldsFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      formfield_configuration_id: new FormControl('', Validators.compose([Validators.required])),
      applicationforms_configuration_id: new FormControl('', Validators.compose([Validators.required])),
      is_mandatory: new FormControl('', Validators.compose([Validators.required])),
      is_hidden: new FormControl('', Validators.compose([Validators.required])),
      is_readonly: new FormControl('', Validators.compose([Validators.required])),
      order_no: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      default_value: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([Validators.required])),
    });
    this.fetchConfigurationItemsDetails();
    // this.onLoadformFieldsData();
    this.onLoadModulesData();

    this.onLoadsubTableModulesData();

    this.onLoadSectionsData();
    this.onLoadProdCategoryData();
    this.onLoadPremiseTypeData();

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

  onRegulatoryFunctionChange($event) {
    if ($event.selectedItem) {
      let regulatory_function = $event.selectedItem;
      this.onLoadSubModulesData(regulatory_function.id)
    }
  }
 
  onActivatetheAdvanceSearch(e) {

    this.show_advancesearch = e.value;

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }



  onAddFormType() {
    this.formTypeFrm.reset();
    this.onAddFormVisible = true;

  }


  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
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
            this.decryptedPayload = this.encryptionService.OnDecryptData(this.data_record.data);
            this.formFieldsData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
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

  onLoadformFieldsData() {
    var data_submit = {
      'table_name': 'cfg_applicationforms_configuration',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.formFieldsData = this.data_record.data;
          }

        },
        error => {

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
  onLoadsubTableModulesData() {
    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.subTableModulesData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onLoadSubModulesData(regulatory_function_id) {
    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions',
      // 'is_enabled': 1,
      regulatory_function_id: regulatory_function_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.subModulesData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onLoadSectionsData() {
    var data_submit = {
      'table_name': 'cfg_sections',
      // 'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.sectionData = this.data_record.data;
          }

        },
        error => {

        });

  }

  onLoadProdCategoryData() {
    var data_submit = {
      'table_name': 'cfg_prodclass_categories',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.prodCategoryData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onloadformfieldConfigurationData(regulatory_function_id) {

    var data_submit = {
      'table_name': 'cfg_formfield_configuration',
      'regulatory_function_id': regulatory_function_id,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.formfieldConfigurationData = this.data_record.data;
          }

        },
        error => {

        });

  }
  onLoadPremiseTypeData() {
    var data_submit = {
      'table_name': 'cfg_premises_types',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.premiseTypeData = this.data_record.data;
          }

        },
        error => {

        });

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

  funcEditDetails(data) {
    this.formTypeFrm.patchValue(data.data);
    this.onAddFormVisible = true;
  }


  funcDeleteDetails(data) {
    this.formTypeFrm.patchValue(data.data);
    this.config_record = data.data.name;
    this.deletePopupVisible = true;
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
      this.funcConfigureFields(data.data);
    }
  }
  funcActionFormFieldColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcFormFieldEditDetails(data);
    }
    else if (action_btn.action === 'enable_record') {
      this.funcEnableDisableRecord(data);
    }

  }

  funcConfigureFields(data) {
    this.isConfigureApplicationFormFields = true;
    this.applicationforms_configuration_id = data.id;
    this.regulatory_function_id = data.regulatory_function_id;

    this.onloadformfieldConfigurationData(this.regulatory_function_id);
    this.onGetApplicationFormFields();

  }
  onGetApplicationFormFields() {
    this.spinnerShow('Loading...........');
    var data_submit = {
      'table_name': 'cfg_applicationforms_fields',
      applicationforms_configuration_id: this.applicationforms_configuration_id
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload = this.encryptionService.OnDecryptData(this.data_record.data);
            this.applicationFormFieldsData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }
  OnAddapplicationFormFields() {
    this.applicationFormFieldsFrm.reset();
    this.onaddApplicationFormFieldsWin = true;
    this.applicationFormFieldsFrm.get('applicationforms_configuration_id')?.setValue(this.applicationforms_configuration_id)

  }


  onFuncSaveApplicationFormFieldData() {
    const formData = new FormData();
    const invalid = [];
    const controls = this.applicationFormFieldsFrm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastr.error('Fill In All Mandatory fields with (*), missing value on ' + name.replace('_id', ''), 'Alert');
        return;
      }
    }
    if (this.applicationFormFieldsFrm.invalid) {
      return;
    }

    this.spinnerShow('saving applicationform fields');
    this.configService.onSaveConfigurationDetailsDetails('cfg_applicationforms_fields', this.applicationFormFieldsFrm.value, 'onsaveConfigData')
      .subscribe(
        response => {
          this.response = response;
          //the details 
          if (this.response.success) {
            this.onGetApplicationFormFields();

            this.onaddApplicationFormFieldsWin = false;
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
  funcFormFieldEditDetails(data) {
    this.applicationFormFieldsFrm.patchValue(data.data);
    this.onaddApplicationFormFieldsWin = true;
  }
}
