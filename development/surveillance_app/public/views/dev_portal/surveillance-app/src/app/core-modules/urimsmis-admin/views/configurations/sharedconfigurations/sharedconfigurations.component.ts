import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core-services/authentication/authentication.service';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DxTabPanelTypes } from 'devextreme-angular/ui/tab-panel';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-sharedconfigurations',
  templateUrl: './sharedconfigurations.component.html',
  styleUrl: './sharedconfigurations.component.css'
})
export class SharedconfigurationsComponent {
  @Input() table_name: string;
  @Input() parameter_name: string;
  @Input() resetcolumns: string;
  countriesinfoData: any[] = [];
  institutionData: any[] = [];
  institutionTypesData: any[] = [];
  institutionDepartmentData: any[] = [];
  regulatoryFunctionData: any;
  regulatorySubFunctionData: any;
  docrequirementsData: any[] = [];
  createNewDataFrm: FormGroup;
  isnewproduct: boolean;
  submitted = false;
  loading = false;
  hasReadpermissions: boolean;
  subCategoriesData: any;
  data_value: string;
  response: any;
  showTabPanel: boolean = false;
  tabPanelPopupVisible: boolean = false;
  createdResponsePopupVisible = false;
  editedResponsePopupVisible = false;
  deletedResponsePopupVisible = false;
  hideAnimation: any;
  showAnimation: any;
  record_id: number;
  addPopupVisible = false;
  show_advancesearch: boolean;
  deletePopupVisible = false;
  data_record: any;
  config_record: string;
  Countries: any;
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
  currencyData: any;
  bankData: any;
  productTypesData: any;
  categoriesData: any;
  feeTypesData: any;
  loadingVisible: boolean;
  is_enabled: boolean;
  enabledisable_tracer: string;
  enabledisable_tracerdescription: string;
  enablePopupVisible: boolean
  spinnerMessage: string;
  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  decryptedPayload:any
  constructor(
    private spinner: SpinnerVisibilityService,
    private router: Router,
    private AuthService: AuthenticationService,
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
      title: new FormControl('', Validators.compose([])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      is_member_state: new FormControl('', Validators.compose([])),
      iso_acyronym: new FormControl('', Validators.compose([])),
      is_tracer_item: new FormControl(false, Validators.compose([])),
      country_id: new FormControl(false, Validators.compose([])),
      routerLink: new FormControl(false, Validators.compose([])),
      institution_id: new FormControl(false, Validators.compose([])),
      regulatory_function_id: new FormControl(false, Validators.compose([])),
      institution_type_id: new FormControl(false, Validators.compose([])),
      resetcolumns: new FormControl('', Validators.compose([])),
      fee_type_id: new FormControl('', Validators.compose([])),
      costcurrency_defination: new FormControl('', Validators.compose([])),
      is_local_currency: new FormControl('', Validators.compose([])),
      is_paying_currency: new FormControl('', Validators.compose([])),
      currency_id: new FormControl('', Validators.compose([])),
      exchange_rate: new FormControl('', Validators.compose([])),
      product_type_id: new FormControl('', Validators.compose([])),
      cost_category_id: new FormControl('', Validators.compose([])),
      regulatory_subfunction_id: new FormControl('', Validators.compose([])),
      data_query: new FormControl('', Validators.compose([])),
      ip: new FormControl('', Validators.compose([])),
      blocked: new FormControl('', Validators.compose([])),
      is_enabled: new FormControl('', Validators.compose([])),
    });


  }

  ngOnInit() {
    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
    this.fetchConfigurationCountriesDetails();
    this.fetchInstitutionTypesDetails();
    this.fetchInstitutionData();
    this.onLoadregulatoryFunctionData();
    this.onLoadregulatorySubFunctionData();
    this.fetchDocRequirementsDetails();
    this.fetchFeeTypesDetails();
    this.fetchSubCategoriesDetails();
    this.fetchCategoriesDetails();
    this.fetchBankDetails();
    this.fetchCurrencyDetails();
    this.fetchProductTypesDetails();
  }
 
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  fetchConfigurationCountriesDetails() {

    var data_submit = {
      'table_name': 'cfg_countries',
      'is_member_state': 1,
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.Countries = this.data_record.data;
          }

        },
        error => {

        });
  }

  fetchInstitutionData() {
    var data_submit = {
      'table_name': 'cfg_institutions',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.institutionData = this.decryptedPayload;
          }
        }
      )
  }

  fetchInstitutionTypesDetails() {

    var data_submit = {
      'table_name': 'cfg_institutions_types',
      'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.institutionTypesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchFeeTypesDetails() {

    var data_submit = {
      'table_name': 'cfg_fee_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.feeTypesData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchCurrencyDetails() {

    var data_submit = {
      'table_name': 'cfg_currencies',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.currencyData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchBankDetails() {

    var data_submit = {
      'table_name': 'cfg_banks',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.bankData = this.data_record.data;
          }
        },
        error => {

        });
  }


  fetchSubCategoriesDetails() {

    var data_submit = {
      'table_name': 'cfg_cost_sub_categories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.subCategoriesData = this.data_record.data;
          }

        },
        error => {

        });

  }

  fetchCategoriesDetails() {

    var data_submit = {
      'table_name': 'cfg_cost_categories',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.categoriesData = this.data_record.data;
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

  onLoadregulatoryFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_functions',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatoryFunctionData = this.data_record.data;
          }

        },
        error => {

        });
  } 

  fetchProductTypesDetails() {

    var data_submit = {
      'table_name': 'cfg_product_types',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.productTypesData = this.data_record.data;
          }

        },
        error => {

        });
  } 

  
  onLoadregulatorySubFunctionData() {

    var data_submit = {
      'table_name': 'cfg_regulatory_subfunctions',
      // 'is_enabled': true,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            // this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.regulatorySubFunctionData = this.data_record.data;
          }
        },
        error => {

        });
  }

  fetchInstitutionDepartments() {
    var data_submit = {
      'table_name': 'cfg_institutions_department',
      'is_enabled': 1,
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.institutionDepartmentData = this.decryptedPayload;
          }
        },
        error => {

        }
      )
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
  fetchDocRequirementsDetails() {

    var data_submit = {
      'table_name': 'dms_document_requirements'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.docrequirementsData = this.decryptedPayload;
          }

        },
        error => {

        });
  }



  onAddNewProduct() {
    this.isnewproduct = true;

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
    this.spinnerShow('deleting ' + this.parameter_name);
    this.configService.onDeleteConfigurationsDetails(this.createNewDataFrm.value, this.table_name, this.parameter_name)
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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }

  }

}