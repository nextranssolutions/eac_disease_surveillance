import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core-services/reports/reports.service';
import { ServiceAdmnistrationService } from 'src/app/core-services/system-admnistration/system-admnistration.service';

@Component({
  selector: 'app-not-slides-informations',
  templateUrl: './not-slides-informations.component.html',
  styleUrl: './not-slides-informations.component.css'
})
export class NotSlidesInformationsComponent {
  createNewDataFrm: FormGroup;
  table_name: string;
  parameter_name: string;
  resetcolumns: string;
  hasReadpermissions: boolean;
  show_advancesearch: boolean;
  slidesInformationData: any = {};
  data_record: any;
  isnewrecord: boolean;
  loadingVisible: boolean;
  spinnerMessage: string;
  deletePopupVisible = false;
  config_record: string;
  record_id: number;
  response: any;
  confirmationData: any;
  loading = false;

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

  regStatusOptions = [
    { value: true, text: 'Yes' },
    { value: false, text: 'No' },
  ];

  constructor(
    private admnistrationService: ServiceAdmnistrationService,
    public toastr: ToastrService,
    private spinner: SpinnerVisibilityService,
    private reportingAnalytics: ReportsService,
  ) {

    this.table_name = 'not_slides_informations';
    this.parameter_name = "slides_informations";

    this.createNewDataFrm = new FormGroup({
      id: new FormControl('', Validators.compose([])),
      name: new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([Validators.required])),
      image_path: new FormControl('', Validators.compose([])),
      slide_content: new FormControl('', Validators.compose([Validators.required])),
      footer: new FormControl('', Validators.compose([Validators.required])),
      is_enabled: new FormControl('', Validators.compose([])),
    });
  }

  ngOnInit() {
    this.fetchSlidesInformation();
    this.onLoadconfirmationData();
  }

  // onImageUploaded(event: any) {
  //   const file = event.target.files[0];
  //   this.createNewDataFrm.patchValue({ image_path: file });
  // }
  onImageUploaded(event: any) {
    const file = event.file;  // DevExtreme specific
    if (file) {
      this.createNewDataFrm.patchValue({ image_path: file });
    } else {
      console.error('No file uploaded or file format is incorrect.');
    }
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
    this.isnewrecord = true;
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

  spinnerShow(spinnerMessage) {
    this.loadingVisible = true;
    this.spinnerMessage = spinnerMessage;
  }
  spinnerHide() {
    this.loadingVisible = false;
  }

  onAddNewRecord() {
    this.createNewDataFrm.reset();
    this.isnewrecord = true;
  }

  fetchSlidesInformation() {

    var data_submit = {
      'table_name': this.table_name,
      // is_enabled: true
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.slidesInformationData = this.data_record.data;

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

  onLoadconfirmationData() {
    let data_submit = {
      'table_name': 'par_confirmations',
      is_enabled: true
    }
    this.admnistrationService.onLoadSystemAdministrationData(data_submit)
      .subscribe(
        data => {
          this.data_record = data;
          if (this.data_record.success) {
            this.confirmationData = this.data_record.data;
          }
        },
        error => {

        });
  }
  onFuncSaveRecordData() {
    const formData = new FormData();
    Object.keys(this.createNewDataFrm.controls).forEach(key => {
      formData.append(key, this.createNewDataFrm.get(key)?.value);
    });
    formData.append('table_name', this.table_name);
    formData.append('resetcolumns', this.resetcolumns);

    this.spinnerShow('Saving ' + this.parameter_name);
    this.admnistrationService.onSaveSystemAdministrationDetails(this.table_name, formData, 'onSaveNotSlidesInformation')
      .subscribe(
        response => {
          this.response = response;
          if (this.response.success) {
            this.fetchSlidesInformation();
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
    this.admnistrationService.onDeleteConfigData(this.createNewDataFrm.value, this.table_name, this.parameter_name)
      .subscribe(
        response => {
          this.spinner.hide();
          this.response = response;
          if (this.response.success) {
            this.fetchSlidesInformation();
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

  onExporting(e: DxDataGridTypes.ExportingEvent) {

    if (e.format == 'pdf') {
      this.reportingAnalytics.onExportingPDF(e)
    }
    else {
      this.reportingAnalytics.onExportingExcelData(e)
    }
  }
}