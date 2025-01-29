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
  selector: 'app-app-document-requirements',
  templateUrl: './app-document-requirements.component.html',
  styleUrl: './app-document-requirements.component.css'
})
export class AppDocumentRequirementsComponent {
  table_name: string = 'dms_document_requirements';
  parameter_name: string = "document_requirements";

  isshow_templateupload: boolean;
  documentRequirementsData: any;

  resetcolumns: string = 'marks_allocated, performancescoring_scale_id,process_id,is_default_language,email_template,notification_type_id,is_default_language,system_label_id,system_language_id,translation,performancescoring_scale_id,checklist_type_id,performancescoring_scale_id';
  confirmationData: any;
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
  documentTypesData: any;
  isMultiline: boolean = true;
  decryptedPayload:any;
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Edit", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete", action: 'delete_record', icon: 'fa fa-trash' },
        { text: "Preview/Download Document", action: 'download_document', icon: 'fa fa-edit' },
       
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
    public dmsService: DocumentManagementService,
    public modalService: NgxSmartModalService,
    private reportingAnalytics: ReportsService,
    public encryptionService: EncryptionService
  ) {
    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([])),
      code: new FormControl('', Validators.compose([])),
      nonstructured_docrequirement_id: new FormControl(false, Validators.compose([])),
      document_type_id: new FormControl(false, Validators.compose([])),
      resetcolumns: new FormControl(this.resetcolumns, Validators.compose([])),
      is_mandatory: new FormControl('', Validators.compose([])),
      file: new FormControl('', Validators.compose([])),
      has_document_template: new FormControl('', Validators.compose([])),
      node_ref: new FormControl('', Validators.compose([]))
    });

  }

  ngOnInit() {
    // other initializations file

    this.createNewDataFrm.get('resetcolumns')?.setValue(this.resetcolumns);
    this.fetchConfigurationItemsDetails();
    this.onLoaddocumentTypeData();
    this.onLoaddocumentRequirementsData();
    this.onLoadconfirmationData();

  }
  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
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

  onLoadconfirmationData() {

    var data_submit = {
      'table_name': 'par_confirmations'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.confirmationData = this.decryptedPayload;
          }

        },
        error => {

        });

  } onLoaddocumentRequirementsData() {

    var data_submit = {
      'table_name': 'dms_nonstructured_docrequirement'
    }
    this.configService.onLoadConfigurationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;  
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.documentRequirementsData = this.decryptedPayload;
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
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.documentTypeData = this.decryptedPayload;
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
    this.spinnerShow('Loading the Application Documents');
    const uploadData = this.prepareSave();
    this.dmsService.uploadApplicationDMSDocument(uploadData, 0, 'OnSaveDocumentRequirementsDef')
      //.pipe(first())
      .subscribe(
        response => {
          this.data_record = response;
          if (this.data_record.success) {
            this.fetchConfigurationItemsDetails();
            this.isnewproduct = false;
            this.toastr.success(this.response.message, 'Response');
          }
          else {

            this.toastr.success(this.data_record.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {
          this.toastr.success('Error occurred', 'Response');

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

  onHasDocumentTemplateSelect($event) {

    if ($event.selectedItem) {
      let account_type = $event.selectedItem;
      let has_template = account_type.id;
      if (has_template == 1) {
        this.isshow_templateupload = true;
      } else {
        this.isshow_templateupload = false;
      }
    }
  }
  private prepareSave(): any {
   
    let input = new FormData();
    input.append('nonstructured_docrequirement_id', this.createNewDataFrm.get('nonstructured_docrequirement_id')?.value);
    input.append('id', this.createNewDataFrm.get('id')?.value);
    input.append('name', this.createNewDataFrm.get('name')?.value);
    input.append('description', this.createNewDataFrm.get('description')?.value);
    input.append('code', this.createNewDataFrm.get('code')?.value);
    input.append('is_mandatory', this.createNewDataFrm.get('is_mandatory')?.value);
    input.append('document_type_id', this.createNewDataFrm.get('document_type_id')?.value);
    input.append('has_document_template', this.createNewDataFrm.get('has_document_template')?.value);
    input.append('file', this.createNewDataFrm.get('file')?.value);
    input.append('node_ref', this.createNewDataFrm.get('node_ref')?.value);
    
    return input;
  }


  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.createNewDataFrm.get('file')?.setValue(file);
    }
  }
}