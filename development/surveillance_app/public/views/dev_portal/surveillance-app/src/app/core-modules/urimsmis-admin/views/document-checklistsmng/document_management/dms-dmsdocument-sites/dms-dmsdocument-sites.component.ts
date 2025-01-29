import { Component, Input, ViewContainerRef } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core-services/utilities/utility.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ConfigurationsService } from 'src/app/core-services/configurations/configurations.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';

@Component({
  selector: 'app-dms-dmsdocument-sites',

  templateUrl: './dms-dmsdocument-sites.component.html',
  styleUrl: './dms-dmsdocument-sites.component.css'
})
export class DmsDmsdocumentSitesComponent  {
  table_name: string = 'dms_dmsdocument_sites';
  parameter_name: string = "dmsdocument_sites";
  resetcolumns: string;
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
  decryptedPayload:any;
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

  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];
  constructor(
    private spinner: SpinnerVisibilityService,
    public toastr: ToastrService,
    public viewRef: ViewContainerRef,
    public configService: ConfigurationsService,
    public utilityService: UtilityService,
    public modalService: NgxSmartModalService,
    public dmsService: DocumentManagementService,
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService
  ) {
    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      node_ref: new FormControl('', Validators.compose([Validators.required])),
      
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      is_dmssite_root: new FormControl(false, Validators.compose([])),
      resetcolumns: new FormControl(false, Validators.compose([]))
    });

  } 

  ngOnInit() {
    // other initializations

    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.countriesinfoData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {
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
    this.dmsService.onSaveDocumentDetailsDetails(this.table_name, this.createNewDataFrm.value, 'onSaveDMSSitedetails')
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