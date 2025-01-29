import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { DocumentManagementService } from 'src/app/core-services/document-management/document-management.service';
import { EncryptionService } from 'src/app/core-services/encryption/encryption.service';
import { ExpressionOfInterestManagementService } from 'src/app/core-services/expresion-of-interest-management/expression-of-interest-management.service';
import { ReportsService } from 'src/app/core-services/reports/reports.service';

@Component({
  selector: 'app-sharedapplicationdocumentuploads',
  templateUrl: './sharedapplicationdocumentuploads.component.html',
  styleUrl: './sharedapplicationdocumentuploads.component.css'
})
export class SharedapplicationdocumentuploadsComponent implements OnChanges {

  @Input() application_code: number;
  @Input() process_id: number;
  @Input() document_type_id: number;
  @Input() appworkflow_status_id: number;
  @Input() uploaded_by: number;
  @Input() workallocations_assignment_id: number;
 
  
  workflow_stage_id: number;

  documentAllTypeData: any;
  documentPreviewUploadedData: any;
  iconPosition: any = "top";
  documentAllTypeRequirements: any;
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();
  loadingVisible: boolean;
  spinnerMessage: string;
  table_name: string = 'tra_uploaded_applicationdocs';
  data_record: any;
  documentTypeRequirements: any;
  supportingDocumentsData: any;
  documentCategoryData: any;
  documentTypeData: any;
  documentApplicationUploadedData: any;
  onApplicationUploadFrm: FormGroup;
  isAppUploadPopupVisible: boolean;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
  document_previewurl: any;
  config_record: string;
  isDocumentPreviewDownloadwin: boolean = false;
  deletePopupVisible: boolean;
  previewAppDocumentUploadedData: any;

  parameter_name: string = "Uploaded Application Documents";
  actionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Preview/Download Document", action: 'download_document', icon: 'fa fa-edit' },
        { text: "Delete Document", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  previewActionsMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        //  { text: "View", action: 'view_record', icon: 'fa fa-eye' },
        { text: "Preview/Download Document", action: 'download_document', icon: 'fa fa-edit' },
      ]
    }
  ];
  decryptedPayload:any;
  constructor(
    private documentService: DocumentManagementService,
    public toastr: ToastrService,
    public eoiService: ExpressionOfInterestManagementService,
    private reportingAnalytics: ReportsService,
    private encryptionService: EncryptionService
  ) {
    this.table_name = 'tra_uploaded_applicationdocs';
    const base_url = AppSettings.base_url;
    this.onApplicationUploadFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      file: new FormControl('', Validators.compose([])),
      application_code: new FormControl('', Validators.compose([])),
      document_requirement_id: new FormControl('', Validators.compose([Validators.required])),
      document_type_id: new FormControl('', Validators.compose([])),
      uploaded_on: new FormControl('', Validators.compose([])),
      uploaded_by: new FormControl('', Validators.compose([])),
      document_folder: new FormControl(false, Validators.compose([])),
      description: new FormControl(false, Validators.compose([])),
      initial_file_name: new FormControl(false, Validators.compose([])),
      process_id: new FormControl(this.process_id, Validators.compose([])),
      uploadeddocuments_id: new FormControl(this.process_id, Validators.compose([])),
      file_name: new FormControl(false, Validators.compose([])),
      workallocations_assignment_id: new FormControl(false, Validators.compose([])),
      
    });
    // this.onLoadApplicationUploadeddocument(this.application_code);
  }
  onCellPrepared(e) {
    this.documentService.onCellPrepared(e);

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.onLoadApplicationUploadeddocument(this.application_code);
    this.onLoaddocumentPreviewUploadedData(this.application_code);
  }
  ngOnInit() {
    if (this.application_code > 0) {
      // this.onLoadApplicationUploadeddocument(this.application_code);
      // this.onLoaddocumentPreviewUploadedData(this.application_code);
    }
    this.onLoaddocumentAllTypeRequirements();
    this.onLoaddocumentTypeRequirements();
    this.onLoaddocumentTypeData();
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width / 100;
  }
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height / 100;
  }

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }
  onLoaddocumentAllTypeRequirements() {
    var data_submit = {
      'table_name': 'dms_document_requirements',
    }
    this.documentService.onLoadDocumentData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentAllTypeRequirements = this.data_record.data;
          }

        },
        error => {

        });
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

  onloadDocumentCategoryData() {

    var data_submit = {
      'table_name': 'eoi_document_category'
    }
    this.documentService.onLoadDocumentData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentCategoryData = this.data_record.data;
          }
        },
        error => {

        });
  }

  onLoadEoiSupportingDocumentsConfig(eoi_id = 0) {
    this.spinnerShow('Loading EOI documents...........');
    var data_submit = {
      'table_name': 'eoi_documents_tosubmit',
      'eoi_id': eoi_id
    }
    this.eoiService.onLoadExpressionOfInterestDataUrl(data_submit, 'onLoadEoiSupportingDocuments')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.decryptedPayload=this.encryptionService.OnDecryptData(this.data_record.data);
            this.supportingDocumentsData = this.decryptedPayload;
          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });
  }
  onLoaddocumentTypeRequirements() {
    var data_submit = {
      'table_name': 'dms_document_requirements',
      'process_id': this.process_id,
      'document_type_id': this.document_type_id,
      'appworkflow_status_id': this.appworkflow_status_id
    }
    this.documentService.onConfigurationItemswithUrl(data_submit, 'onLoaddocumentTypeRequirements')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentTypeRequirements = this.data_record.data;
          }

        },
        error => {

        });
  }

  funcActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'download_document') {
      this.funcDocmentPreviewedit(data.data);
    } else if (action_btn.action === 'delete_record') {
      this.funcDeleteDetails(data);
    }
  }
  funcDeleteDetails(data) {
    this.onApplicationUploadFrm.patchValue(data.data);
    this.config_record = data.data.file_name;
    this.deletePopupVisible = true;
  }
  onDeleteDocumetnsData() {
    this.spinnerShow('Removing the Selected Application Document');

    this.documentService.onDeleteUploadedDocumentDetails(this.onApplicationUploadFrm.value, this.table_name, "Application Documents")
      .subscribe(
        response => {

          this.data_record = response;
          if (this.data_record.success) {
            this.onLoadApplicationUploadeddocument(this.application_code);
            this.deletePopupVisible = false;
            this.toastr.success(this.data_record.message, 'Response');
          }
          else {

            this.toastr.success(this.data_record.message, 'Response');

          }
          this.spinnerHide();
        },
        error => {

          this.spinnerHide();
        });

  }


  funcDocmentPreviewedit(data) {
    this.spinnerShow('Downloading Document');
    if (data.node_ref == '') {
      this.toastr.success('Upload Document for you to download', 'Response');
      return;
    }
    this.documentService.getApplicationDocumentDownloadurl(this.application_code, data.node_ref, data.uploadeddocuments_id)
      .subscribe(
        response => {
          this.spinnerHide();
          let response_data = response;
          if (response_data.success) {
            var a = document.createElement("a");
            a.href = response_data.document_url;
            a.download = response_data.filename;
            this.document_previewurl = this.documentService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin = true;

          }
          else {

            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.spinnerHide();
        });
  }


  onLoaddocumentTypeData() {
    var data_submit = {
      'table_name': 'dms_document_types'
    }
    this.documentService.onLoadDocumentData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentTypeData = this.data_record.data;
          }

        },
        error => {

        });
  }

  onLoaddocumentPreviewUploadedData(application_code) {
    this.spinnerShow('Loading Uploaded Document.')
    var data_submit = {
      'table_name': 'dms_document_requirements',
      'application_code': application_code,
      'workallocations_assignment_id':this.workallocations_assignment_id,
      'uploaded_by': this.uploaded_by
    }
    this.documentService.onConfigurationItemswithUrl(data_submit, 'onLoaddocumentPreviewUploadedData')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentPreviewUploadedData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });


  }
  onLoadApplicationUploadeddocument(application_code) {
    this.spinnerShow('Loading document requirement & Uploaded Document.')
    var data_submit = {
      'table_name': 'dms_document_requirements',
      'process_id': this.process_id,
      'document_type_id': this.document_type_id,
      'application_code': application_code,
      'uploaded_by': this.uploaded_by,
      'workflow_stage_id': this.workflow_stage_id,
      'workallocations_assignment_id':this.workallocations_assignment_id,
      'appworkflow_status_id': this.appworkflow_status_id
    }
    this.documentService.onConfigurationItemswithUrl(data_submit, 'onLoadApplicationUploadeddocument')
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.documentApplicationUploadedData = this.data_record.data;
          }
          this.spinnerHide();
        },
        error => {
          this.spinnerHide();
        });
  }
  onAddUploadedApplicationDocument() {
    this.isAppUploadPopupVisible = true;
    this.onApplicationUploadFrm.reset();
    this.onApplicationUploadFrm.get('process_id')?.setValue(this.process_id);
  }

  private prepareSave(): any {
    this.onApplicationUploadFrm.get('application_code')?.setValue(this.application_code);
    this.onApplicationUploadFrm.get('document_type_id')?.setValue(this.document_type_id);

    let input = new FormData();
    input.append('document_requirement_id', this.onApplicationUploadFrm.get('document_requirement_id')?.value);
    input.append('file', this.onApplicationUploadFrm.get('file')?.value);
    input.append('id', this.onApplicationUploadFrm.get('id')?.value);
    input.append('document_type_id', this.onApplicationUploadFrm.get('document_type_id')?.value);
    input.append('application_code', this.onApplicationUploadFrm.get('application_code')?.value);
    input.append('process_id', this.onApplicationUploadFrm.get('process_id')?.value);
    input.append('workallocations_assignment_id', this.onApplicationUploadFrm.get('workallocations_assignment_id')?.value);

    return input;
  }
  onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.onApplicationUploadFrm.get('file')?.setValue(file);
    }
  }
  onaplicationDocumentUpload() {
    this.spinnerShow('Loading the Application Documents');
    const uploadData = this.prepareSave();
    this.documentService.uploadApplicationDMSDocument(uploadData, this.application_code, 'onaplicationDocumentUpload')
      //.pipe(first())
      .subscribe(
        response => {
          this.data_record = response;
          if (this.data_record.success) {
            this.isAppUploadPopupVisible = false;
            this.onLoadApplicationUploadeddocument(this.application_code);
            this.toastr.success(this.data_record.message, 'Response');
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
  onUploadApplicationDocument(data) {

    this.isAppUploadPopupVisible = true;
    this.onApplicationUploadFrm.reset();
    this.onApplicationUploadFrm.get('document_requirement_id')?.setValue(data.document_requirement_id);
    this.onApplicationUploadFrm.get('process_id')?.setValue(this.process_id);

    this.onApplicationUploadFrm.get('workallocations_assignment_id')?.setValue(this.workallocations_assignment_id)
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
